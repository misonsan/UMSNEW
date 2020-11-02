
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
 public User: User;
 public title = "dettaglio utente xx";
 faHandPointLeft = faHandPointLeft;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router) { }

ngOnInit() {

  this.route.paramMap.subscribe(p => {
      this.userService.getUser(+p.get('id')).subscribe(
        response => {
            this.User = response['data'];
        },
        error => {
   //       alert('User-Data  -- OnInit: ' + error.message);
           console.log(error);
        }
      );
  });



 /*
  this.route.params.subscribe(p => {
    alert('user-deta - letto utente passato ' + p.id);
      this.userService.getUser(+p.id).subscribe(
        response => {
            this.User = response['data'];
        },
        error => {
          alert('user-deta - errore non esegui subscribe ' + error);
          console.log(error);
        }
      );
      alert('user-deta - dopo subscribe ' + this.User.id );
  });  */
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
