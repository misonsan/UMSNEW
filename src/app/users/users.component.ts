import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../classes/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[] = [];
  @Output('updateUser') updateUser = new EventEmitter<User>();

  public isCollapsed = false;  // per gestire il collapse con un button

  constructor(private userService: UserService) {

  }

  ngOnInit() {
     this.userService.getUsers().subscribe(
       res => {
        this.users = res['data'];
       },
       error => {
        console.log(error);
       }
     );
  }

  onDeleteUser(user: User) {

    const domanda = confirm("Sei sicuro di voler cancellare?");
    if (domanda === true) {
      this.userService.deleteUser(user).subscribe(
        response => {
              alert(response['message']);
        });
     }else{
      alert('Operazione annullata');
    }

  }

  onSelectUser(user: User) {
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
