import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class ABlobService {

  constructor(private file: File) { }
  formatoBlob(fotoInfo) {
    
    return new Promise((resolve, reject) => {
      let fileName;
    console.log("hola");
      fileName= (<String>fotoInfo.localURL).substring(0, fotoInfo.localURL.lastIndexOf("/"));
      fileName+="/"
      console.log(fileName);
      console.log(fotoInfo.name);
      console.log(fotoInfo.localURL);
      this.file.readAsArrayBuffer(fileName, fotoInfo.name)
        .then(buffer => {
          console.log("2");
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg",
          });
          resolve({ fileName, imgBlob });
        }).catch(e => reject(e));
    });
  }
}
