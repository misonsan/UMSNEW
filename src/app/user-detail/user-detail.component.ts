import {Component, OnInit, Input} from '@angular/core';
import {User} from '../classes/user';
import {UserService} from '../services/user.service';
import { faUndo, faSave, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

// fino a video 38 instasllazione font awesome

export class UserDetailComponent implements OnInit {
  private usercopy;
  private __user;
  // definizione delle icone utilizzate
  faSave = faSave;
  faUndo = faUndo;
  faHandPointLeft = faHandPointLeft;

  @Input() set user(user: User) {
    this.__user = user;
    this.usercopy = Object.assign({}, user);
  }

  get user() {
    return this.__user;
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit() {
    this.user = new User();

    this.route.params.subscribe(
      (params) => {
      //  alert('User-Detail ---> ngOnInit masso codiceuser: ' + params.id);
        this.user = this.userService.getUser(+params.id);
      }
    );
  }

  saveUser() {
    if (this.user.id > 0) {
      this.userService.updateUser(this.user);
    } else {
      this.userService.createUser(this.user);
    }
    this.router.navigate(['users']);
  }

  resetForm(form) {

    if (this.user.id === 0) {
      this.user = new User();
    } else {
      this.user = this.usercopy;
    }

  }

  backToUsers(){
    this.router.navigate(['users']);
  }
}
