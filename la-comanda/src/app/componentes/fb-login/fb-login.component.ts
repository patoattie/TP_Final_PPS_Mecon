import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { UsuarioService } from 'src/app/servicios-mecha/usuario.service';
import { AuthService } from 'src/app/servicios-mecha/auth.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.scss'],
})
export class FbLoginComponent implements OnInit {
  spinner: boolean;
  router: any;

  constructor(private fb: Facebook, private usuarioServicio: UsuarioService, private authservicio: AuthService ) { }

  ngOnInit() {


  }


  fblogin() {



    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api("/me?fields=id,name,email", ["public_profile", "email"])
        .then((res) => {
          setTimeout(() => {
            this.usuarioServicio.buscarUsuarioPorEmail(res.email).subscribe(usuarios => {
              this.authservicio.usuarioLoguiado = usuarios[0];
              this.spinner = false;
              //console.log(this.authservicio.usuarioLoguiado.perfil);
              if (this.authservicio.usuarioLoguiado.perfil == undefined) {
                swal("Todavía no estás registrado", {
                  buttons: ["Soy cliente", "Soy empleado"],
                })
                .then((value) => {
                  switch (value) {
                 
                    case "Soy cliente":
                      swal("Pikachu fainted! You gained 500 XP!");
                      break;
                 
                    case "catch":
                      swal("Soy empleado");
                      break;
                 
                  
                  }
                });
              } else {
                this.router.navigate(['/principal']);
              }
  
            }, (err) => {
              swal("Error", "Usuario no encontrado", "error");
              this.spinner = false;
              console.log("usuario ni encontrado en base", err);
             
             });
          }, 1500);
          console.log("email", res.email)}     
        );
      }
        
        )
      .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);


    
    

  }



}




