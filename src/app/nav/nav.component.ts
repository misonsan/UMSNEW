/*    originale

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() onNewUser = new EventEmitter();
  faUserPlus = faUserPlus;

  public showMenu = true;    // variabile per impostare la visualizzazione della barra  - soluzione puro Angular

  public isColapsed = true;  // variabile per soluzione con ngbootstrap
  constructor() { }

  ngOnInit(): void {
  }


  newUser() {
    this.onNewUser.emit();
  }

  // se utilizziamo la soluzione di Angular Puro
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
 */

/* versione corretta mer menù Hidran con DropDown  */

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faUserPlus,faUserFriends, faPassport } from '@fortawesome/free-solid-svg-icons';
import { User } from '../classes/User';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() onNewUser = new EventEmitter();

  public isUserLoggedIn = false;
  faUserPlus = faUserPlus;
  faUserFriends = faUserFriends;

  public showMenu = true;    // variabile per impostare la visualizzazione della barra  - soluzione puro Angular

  public isCollapsed = true;  // variabile per soluzione con ngbootstrap
  public username: string;

  constructor(private route: Router, private auth: AuthService) {
    // ascolto evento creato in auth.service
    auth.usersignedin.subscribe(
        (user: User)  => {
            this.username = user.name;
            this.isUserLoggedIn = true;
        }
    );
// l'evento logout non ha come risultato un utente quindi lascio vuoto ()
    auth.userlogout.subscribe(
          ()  => {
              this.username = '';
              this.isUserLoggedIn = false;
          }
    );
     // per la registrazione ascolto evento creato in auth.service
    auth.usersignedup.subscribe(
            (user: User)  => {
                this.username = user.name;
                this.isUserLoggedIn = true;
      }
    );
    // per il cambio password ascolto evento creato in auth.service
    auth.userchgpwd.subscribe(
      (user: User)  => {
          this.username = user.name;
          this.isUserLoggedIn = true;
      }
  );
  }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    if(this.isUserLoggedIn)  {
      const user = this.auth.getUser();
      this.username = user.name;
    }




  }


  newUser() {

    this.onNewUser.emit();
  }

  // se utilizziamo la soluzione di Angular Puro
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout(e) {   // la "e" è l'evento passato da html
    e.preventDefault()
    this.auth.logout();
    this.route.navigate(['login']);
    }

  login(email, pass) {
    this.auth.signIn(email, pass);
  }

  signIn(e) {
    e.preventDefault()
    this.route.navigate(['login']);
  }

  signUp(e) {
    e.preventDefault()
    this.route.navigate(['signup']);
  }


  chgpwd(e)  {
    e.preventDefault()
    this.route.navigate(['chgpwd']);
  }

}
