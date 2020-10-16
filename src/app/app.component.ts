
import {Component} from '@angular/core';
import {User} from './classes/user';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UMSNEW';
  lista = 'Lista Utenti';
  showForm = false;
  userSelected = new User();
  faUserPlus = faUserPlus;

    updateUser(user: User) {
    this.showForm = true;
    this.userSelected = user;
  }
    newUser() {
    this.userSelected = new User();
    this.showForm = true;

  }
}
