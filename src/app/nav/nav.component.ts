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
  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
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




}
