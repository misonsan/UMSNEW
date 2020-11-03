import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = true;
  constructor() { }

isUserLoggedIn()  {
  // faccio la verifica se l'utente è loggato
  return this.isUserLogged;

}

signIn(email: string, password: string) {
  // metodo con il quale l'utente si logga
}

signUp(username: string, email: string, password: string) {
  // metodo per la registrazione dell 'utente
}

logout() {
  this.isUserLogged = false;
}

}
