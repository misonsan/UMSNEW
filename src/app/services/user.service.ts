import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from '../classes/User';
import { AuthService } from './auth.service';



@Injectable()

export class UserService {

// lettura dati da server laraapi
  users: User[] = [];  // definisco i dati come array vuoto

  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

  constructor(private http: HttpClient, private auth: AuthService) {
  }

// attenzione: per ogni funzione che voglio usare DEVO passare il token per dimostrare che sono loggato




  getAuthHeader(): HttpHeaders   {
    // passo il token dentro a header per non farlo passare in chiaro su url
    let headers = new HttpHeaders(
        {
            Authorization: 'Bearer ' +  this.auth.getToken()
        }
      );
      return headers;
    }



  getUsers() {

  // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

  // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

      // primo metodo passando il token in chiaro su url
      //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

      // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
      return this.http.get(this.APIURL , {
          headers: this.getAuthHeader()
        });


      }

      getUser(id: number) {
        return this.http.get(this.APIURL + '/' + id,  {
          headers: this.getAuthHeader()
        });
      }


      deleteUser(user: User) {
        return this.http.delete(this.APIURL + '/' + user.id,  {
          headers: this.getAuthHeader()
        });

      }



  updateUser(user: User) {

    // imposto il metodo put pervhè laravel non gestisce e devo utilizzare il post per camuffare
    //
    //   return this.http.patch(this.APIURL + '/' + user.id,user);
    user['_method'] = 'PUT';

    return this.http.patch(this.APIURL + '/' + user.id, user, {
      headers: this.getAuthHeader()
    });

  }


   createUser(user: User){
    return this.http.post(this.APIURL, user, {
      headers: this.getAuthHeader()
    });
  }



}

