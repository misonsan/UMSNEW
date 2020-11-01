
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


}


  backToUsers(){
    this.router.navigate(['users']);
  }
}
