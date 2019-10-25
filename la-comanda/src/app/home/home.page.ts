import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  spinner=true;
  usuario: any;
  constructor() {
    this.loading();
  }


  loading(){

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.spinner=false;
    
  }, 5000);

  }

}
