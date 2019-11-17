import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });




//566153021091-cvhfn3psucb6gmkn5nbgj92uht3nbf10.apps.googleusercontent.com


// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.firestore.document('/usuarios/{uid}').onWrite(async (change) => {
  const snapshot = change.after;
   // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
   const val:any = snapshot.data();
      // perform desired operations ..
  if (!change.after.exists) {
    return null;
  }

  const mailOptions: any = {
    from: '"Spammy Corp." <noreply@firebase.com>',
    to: val.email,
  };

  const subscribed = val.subscribedToMailingList;

  // Building Email message.
  mailOptions.subject = subscribed ? 'Gracias y Bienvenido!' : 'disculpas ocurrió un error :`(';
  mailOptions.text = subscribed ?
      'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.' :
      'I hereby confirm that I will stop sending you the newsletter.';
  
  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;

});


import * as admin from 'firebase-admin';
admin.initializeApp();

exports.sendFollowerNotification = functions.database.ref('/followers/{followedUid}/{followerUid}')
    .onWrite(async (change, context) => {
      const followerUid = context.params.followerUid;
      const followedUid = context.params.followedUid;
      // If un-follow we exit the function.
      if (!change.after.val()) {
         let retorno:string = 'User '+ followerUid.toString() + 'un-followed user'+ followedUid.toString();
        return retorno;
      }
      console.log('We have a new follower UID:', followerUid, 'for user:', followedUid);

      // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.database()
          .ref(`/users/${followedUid}/notificationTokens`).once('value');

      // Get the follower profile.
      const getFollowerProfilePromise = admin.auth().getUser(followerUid);

      // The snapshot to the user's tokens.
      let tokensSnapshot:any;

      // The array containing all the user's tokens.
      let tokens:any;

      const results: any = await Promise.all([getDeviceTokensPromise, getFollowerProfilePromise]);
      tokensSnapshot = results[0];
      const follower: any = results[1];

      // Check if there are any device tokens.
      if (!tokensSnapshot.hasChildren()) {
        return 'There are no notification tokens to send to.';
      }
      console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
      console.log('Fetched follower profile', follower);

      // Notification details.
      const payload = {
        notification: {
          title: 'You have a new follower!',
          body: `${follower.displayName} is now following you.`,
          icon: follower.photoURL
        }
      };

      // Listing all tokens as an array.
      tokens = Object.keys(tokensSnapshot.val());
      // Send notifications to all tokens.
      const response: any = await admin.messaging().sendToDevice(tokens, payload);
      // For each message check if there was an error.
      const tokensToRemove: any[] = [];
      response.results.forEach((result:any, index:number) => {
        const error: any = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });




    //detecta un nuevo ingreso de cliente al local y lo registra al leer el qr
    exports.enviarNotificacionLocal2 = functions.database.ref('/local/{localUid}')
    .onWrite(async (change, context) => {
            // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.database()      
          .ref('/devices/{uid}/token').once('value');

      // Get the follower profile.
     // const getFollowerProfilePromise = admin.auth().getUser(followerUid);

      // The snapshot to the user's tokens.
      let tokensSnapshot:any;

      // The array containing all the user's tokens.
      let tokens:any;

      const results: any = await Promise.all([getDeviceTokensPromise]);
      tokensSnapshot = results[0];
      //const follower: any = results[1];

      // Check if there are any device tokens.
      if (!tokensSnapshot.hasChildren()) {
        return 'There are no notification tokens to send to.';
      }
      console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
      //console.log('Fetched follower profile', follower);

      // Notification details.
      const payload = {
        notification: {
          title: 'Hay un nuevo cliente en la sala!',
          body: 'is now following you.',
          //icon: follower.photoURL
        }
      };

      // Listing all tokens as an array.
      tokens = Object.keys(tokensSnapshot.val());
      // Send notifications to all tokens.
      const response: any = await admin.messaging().sendToDevice(tokens, payload);
      // For each message check if there was an error.
      const tokensToRemove: any[] = [];
      response.results.forEach((result:any, index:number) => {
        const error: any = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });

   // Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/mensajes/{pushId}/original')
.onCreate((snapshot:any, context:any) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  let retorno:any =snapshot.ref.parent.child('uppercase').set(uppercase);
  return retorno;
});



    //detecta un nuevo ingreso de cliente al local y lo registra al leer el qr
    exports.enviarNotificacionLocal3 = functions.firestore
    .document('/local/{uid}')
    .onWrite(async (change, context) => {
            // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.firestore()   
          .collection("devices")   
          .get();

      const results: any = await Promise.all([getDeviceTokensPromise]);

      //const follower: any = results[1];

      // Check if there are any device tokens.
      
      results[0].forEach(async (result: { data: () => { token: any, userId: string }; }) => {
          const tokens: any[] = [];
          const token = result.data().token;
          const userId = result.data().userId;
          tokens.push(token);

          
      // Notification details.
      const payload = {
        notification: {
          title: 'Hay un nuevo cliente en la sala!',
          body:  `${userId} acaba de ingresar a la sala.`,
          //icon: follower.photoURL
        }
      };

     
      // Send notifications to all tokens.
      const response: any = await admin.messaging().sendToDevice(tokens, payload);
      

      // For each message check if there was an error.
      const tokensToRemove: any[] = [];
      response.results.forEach((result2:any, index:number) => {
        const error: any = result2.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(results[0].ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);

      })     
     

    });