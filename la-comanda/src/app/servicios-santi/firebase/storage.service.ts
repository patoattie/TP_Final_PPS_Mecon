import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _angularFirestore:AngularFirestore,

  ) { }
  getAllproducto(){
    return this._angularFirestore.collection("producto", ref => ref.orderBy('date'))
      .valueChanges();
  }
}
