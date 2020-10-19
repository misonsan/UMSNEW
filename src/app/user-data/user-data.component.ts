
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
 private User: User;
 private title = "dettaglio utente";
 faHandPointLeft = faHandPointLeft;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      this.User = this.userService.getUser(+p.id);

    });
  }
  backToUsers(){
    this.router.navigate(['users']);
  }
}






/*
 originale del componente su progetto moreno

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from './../services/user.service';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

//

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private user: User;
  faHandPointLeft = faHandPointLeft;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
      this.user = new User();
    // sottoscrivo il route
      this.route.params.subscribe(
            p => {
          alert ('User-Data - OnInit - id Passato: ' + p.id);
          this.user = this.userService.getUser(+p.id);
              }
       );
  }

  backToUsers(){
    this.router.navigate(['users']);
  }
}
 */
