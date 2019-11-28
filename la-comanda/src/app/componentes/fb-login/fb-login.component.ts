import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.scss'],
})
export class FbLoginComponent implements OnInit {

  constructor(private fb: Facebook) { }

  ngOnInit() {


  }


  fblogin() {



    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api("/me?fields=id,name,email", ["public_profile", "email"])
        .then( (res) => {console.log("email", res.email)}     
        );
      }
        
        )
      .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);


    
    

  }



}




