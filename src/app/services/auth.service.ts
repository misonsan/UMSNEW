import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/User';
import {tap} from "rxjs/operators";


interface Jwt {
// definisco l'interfaccia dei dati che ottengo dalla chiamata di login
    access_token: string;
    token_type: string;
    expires_in: number;
// parametri aggiuntivi - vedi AuthController in laraapi
    user_name: string;
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = true;
  // emettiamo degli eventi (la auth.service) che potranno essere ascoltati su altri componenti
  @Output() usersignedin = new EventEmitter<User>();
  @Output() usersignedup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();
  @Output() userchgpwd = new EventEmitter();

  private APIAUTHURL = 'http://localhost:8000/api/auth/';  // definisco l'url su cui effettuare la lettura sul server


  constructor(private http: HttpClient) { }

isUserLoggedIn()  {           // ---- ok
  // faccio la verifica se l'utente è loggato
  // con !! (doppia negazione) trasformiamo in booleano il risultato della verifica su localStorage
  this.isUserLogged = !!localStorage.getItem('token');
  return this.isUserLogged;

}



//  versione 1   con subscribe fatta nel service
/*
signIn(email: string, password: string) {
  // metodo con il quale l'utente si logga
  // alert(' auth-service: '  + email + ' -- ' + password);

  // salvo in localstorage, come token' la email per indicare che mi sono loggato


    localStorage.clear();
    this.http.post(this.APIAUTHURL + 'login',
          {
            email: email,
            password: password
          }).subscribe(
            (payload: Jwt) => {   // payload variabile che identifica risposta del server

              localStorage.setItem('token', payload.access_token);
              console.log(payload)
              localStorage.setItem('user', JSON.stringify(payload));
              // campi aggiuntivi messi per testare - facoltativi
              localStorage.setItem('user_name', payload.user_name);
              localStorage.setItem('user_email', payload.email);
              localStorage.setItem('user_psw', payload.password);

              // creo l'evento che sarà gestito da altri componenti
              let user = new User();
              user.name = payload.user_name;
              user.email =  payload.email;
              this.usersignedin.emit(user);
              return true;  // provvisorio

            },
              (httpresp: HttpErrorResponse)  => {
               console.log(httpresp.message);
                alert('AuthService-login_Error: ' + httpresp.message);
             }
          )

}
*/

//  versione 2 - sposto il subscribe nel componente che chiama il service
signIn(email: string, password: string) {

  return  this.http.post(this.APIAUTHURL + 'login',
     {
       email: email,
       password: password
     }
   ).pipe(
     tap(
    (payload: Jwt) => {
      localStorage.setItem('token', payload.access_token);
      console.log(payload)
      localStorage.setItem('user' , JSON.stringify(payload));            // campi aggiuntivi messi per testare - facoltativi
      localStorage.setItem('user_name', payload.user_name);
      localStorage.setItem('user_email', payload.email);
      localStorage.setItem('user_psw', payload.password);

      const user = new User();
      user.name = payload.user_name;
      user.email = payload.email;
      this.usersignedin.emit(user);
      return true;

    }
  ));


 }


// primo metodo - funziona
/*
signUp(username: string, email: string, password: string) {   // ----- ok
  // metodo per la registrazione dell 'utente

    const user = new User();
    user.name = username;
    user.email =  email;

    this.http.post(this.APIAUTHURL + 'signup',
        {
          email: email,
          password: password,
          name: username
        }).subscribe(
          (payload: Jwt) => {   // payload variabile che identifica risposta del server

            localStorage.setItem('token', payload.access_token);
            console.log(payload);
            localStorage.setItem('user', JSON.stringify(payload));
            // campi aggiuntivi messi per testare - facoltativi
            localStorage.setItem('user_name', payload.user_name);
            localStorage.setItem('user_email', payload.email);
            localStorage.setItem('user_psw', payload.password);

            this.usersignedup.emit(user);
            return true;  // provvisorio

          },
            (httpresp: HttpErrorResponse)  => {
             console.log(httpresp.message);
              alert('AuthService-signup: ------> ' + httpresp.message);
           })

}
  */

// Secondo metodo -

signUp(username: string, email: string, password: string) {   // ----- ok
  // metodo per la registrazione dell 'utente

    const user = new User();
    user.name = username;
    user.email =  email;

    return this.http.post(this.APIAUTHURL + 'signup',
        {
          email: email,
          password: password,
          name: username
        }).pipe(
          tap(
            (payload: Jwt) => {   // payload variabile che identifica risposta del server

              localStorage.setItem('token', payload.access_token);
              console.log(payload);
              localStorage.setItem('user', JSON.stringify(payload));
              // campi aggiuntivi messi per testare - facoltativi
              localStorage.setItem('user_name', payload.user_name);
              localStorage.setItem('user_email', payload.email);
              localStorage.setItem('user_psw', payload.password);

              this.usersignedup.emit(user);
              return true;  // provvisorio
            }
           ));

}







chgpwd(username: string, emailx: string, newpassword: string) {   // ----- ok
  // metodo per la registrazione dell 'utente

    const user = new User();
    user.name = username;
    user.email =  emailx;

    this.http.post(this.APIAUTHURL + 'chgpwd',
        {
          password: newpassword

        }).subscribe(
          (payload: Jwt) => {   // payload variabile che identifica risposta del server

            localStorage.setItem('token', payload.access_token);
            console.log(payload);
            localStorage.setItem('user', JSON.stringify(payload));
            // campi aggiuntivi messi per testare - facoltativi
            localStorage.setItem('user_name', payload.user_name);
            localStorage.setItem('user_email', payload.email);
            localStorage.setItem('user_psw', payload.password);

            this.userchgpwd.emit(user);
            return true;  // provvisorio

          },
            (httpresp: HttpErrorResponse)  => {
             console.log(httpresp.message);
              alert('AuthService-chgpwd: ------> ' + httpresp.message);
           })

}




logout() {   // ------  ok
  localStorage.removeItem('token');
  // devo eliminare tutte le eventuali variabili salvate su localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_psw');

  this.userlogout.emit();
  this.isUserLogged = false;
}


getUser(): User {     // ----- ok
  // salvo su una variabile i dati dell'utente salvati in localStorage
  const data =  JSON.parse(localStorage.getItem('user'));  // normalizzo la variabile user salvata con JSON.stringify
  let user = new User();
  if(data)  {
    user.name = data['user_name'];
    user.email =  data['email'];
  }
  return user;
}

getToken() {    // -----  ok
  return localStorage.getItem('token');
}


// metodo creato da Moreno per gestire lettura con Username, email e password attuale (changepwd)
getUserLong(username: string, emailx: string, passwordOld: string) {   // ----- ok
  // metodo per la registrazione dell 'utente


    this.http.post(this.APIAUTHURL + 'getUserLong',
        {
          email: emailx,
          password: passwordOld,
          name: username
        }).subscribe(
          (payload: Jwt) => {

            localStorage.setItem('token', payload.access_token);
            console.log(payload);
            localStorage.setItem('user', JSON.stringify(payload));
            // campi aggiuntivi messi per testare - facoltativi
            localStorage.setItem('user_name', payload.user_name);
            localStorage.setItem('user_email', payload.email);
            localStorage.setItem('user_psw', payload.password);


            return true;

          },
            (httpresp: HttpErrorResponse)  => {
             console.log(httpresp.message);
              alert('AuthService-getUserLong: ------> ' + httpresp.message);
           })
}




}


/*
   buttare

.pipe(tap(
          (payload: Jwt) => {

            localStorage.setItem('token', payload.access_token);
            console.log(payload);
            localStorage.setItem('user', JSON.stringify(payload));
            // campi aggiuntivi messi per testare - facoltativi
            localStorage.setItem('user_name', payload.user_name);
            localStorage.setItem('user_email', payload.email);
            localStorage.setItem('user_psw', payload.password);
            return true;
          }
        ));

subscribe(
          (payload: Jwt) => {

            localStorage.setItem('token', payload.access_token);
            console.log(payload);
            localStorage.setItem('user', JSON.stringify(payload));
            // campi aggiuntivi messi per testare - facoltativi
            localStorage.setItem('user_name', payload.user_name);
            localStorage.setItem('user_email', payload.email);
            localStorage.setItem('user_psw', payload.password);


            return true;

          },
            (httpresp: HttpErrorResponse)  => {
             console.log(httpresp.message);
              alert('AuthService-getUserLong: ------> ' + httpresp.message);
           })




*/
