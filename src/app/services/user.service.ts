import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from '../classes/user';



@Injectable()

export class UserService {

// lettura dati da server laraapi
  users: User[] = [];  // definisco i dati come array vuoto

  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

  private APIURL_ID;
  constructor(private http: HttpClient) {
  }

  getUsers() {

  // ritorniamo un observoble - il subscribe devo farlo su users.component.ts
        return this.http.get(this.APIURL);
        }

  getUser(id: number) {
    this.APIURL_ID = this.APIURL + '/' + id;
    return this.http.get(this.APIURL_ID);

    }



  deleteUser(user: User) {
     // const data = {_Method: 'DELETE'};
     // return this.http.post(this.APIURL + '/' + user.id, data);
     return this.http.delete(this.APIURL + '/' + user.id);
    }



  updateUser(user: User) {

    // imposto il metodo put pervhè laravel non gestisce e devo utilizzare il post per camuffare
    //
    //   return this.http.patch(this.APIURL + '/' + user.id,user);
    user['_method'] = 'PUT';
    return this.http.patch(this.APIURL + '/' + user.id, user);

  }


   createUser(user: User){
    return this.http.post(this.APIURL, user);
  }


/*
  ---------------------  gestione con array
 getUsers() {
    return this.users;
  }

  deleteUser(user: User) {
         // determino indice dell'elemento da cancellare
    const index = this.users.indexOf(user);
    // controllo di avere un indice corretto
    if (index >= 0) {
      this.users.splice(index, 1);
    }

  }

  updateUser(user: User) {
      // aggiorno utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array
    const idx = this.users.findIndex((v) => v.id === user.id);
    // alert('l indice trovato da modificare: ' + idx);
    if (idx !== -1) {
      this.users[idx] = user;
    }
  }


   createUser(user: User) {
    // inserisco utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array

      let indend = this.users.length;
      let indnew = indend + 1;
      user.id = indnew;
      this.users.splice(indend,0,user);
   }

*/




}

