import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, ChildEvent } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class KeyService {
  bdList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private authorization: AngularFireAuth) { }

  // getAll() {
  //   // Buscando todos os itens no no "/task"
  //   console.log(this.firebase.list('usuario'))
  //   // console.log(this.bdList.snapshotChanges([]))
  //   return this.firebase.database.app;
  // }
 
  // getAllCompleted() {
  //     let ref = this.firebase.database.ref("usuario");
  //     ref.once("value")
  //       .then(function(snapshot) {
  //         console.log(snapshot)
  //         var key = snapshot.key; // "ada"
  //         var childKey = snapshot.child("name/last").key; // "last"
  //       });
  // }
 
  
  getLista(model) {
    let list: Array<any> = []; 
    this.firebase.database.ref(model).on('child_added', function(data) {
      list.push(data.val());
    });
    return list;
  }

  getData(model) {
    this.bdList = this.firebase.list(model);
    return this.bdList;
  }

  inserir(model, objeto) {
    this.bdList = this.firebase.list(model);
    this.bdList.push(objeto);
  }

  alterar(model, objeto) {
    this.bdList = this.firebase.list(model);
    this.bdList.update(objeto.$key, objeto);
  }

  deletar(model, key: string) {
    this.bdList = this.firebase.list(model);
    this.bdList.remove(key);
  }

  doLogin(account) {
    if (account.usuario && account.senha) {
      return this.authorization.auth
        .signInWithEmailAndPassword(account.usuario, account.senha)
        .then((resp) => {
        }).catch(error => {
        });
    } else {
      return null;
    };
  }
}
