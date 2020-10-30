import {Component, OnInit, Input} from '@angular/core';
import {User} from '../classes/user';
import {UserService} from '../services/user.service';
import { faUndo, faSave, faHandPointLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
  faTrashAlt = faTrashAlt;

  @Input() set user(user: User) {
    this.__user = user;
    this.usercopy = Object.assign({}, user);
  }

  get user() {
    return this.__user;
  }


  public perDebug = 'utente passato: ';
  public message = '';
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit() {
     this.user = new User();

     this.route.params.subscribe(params => {
        if (!params.id) {
            return;
        }
    //    alert('user-detail - letto utente passato ' + params.id);

        this.userService.getUser(+params.id).subscribe(
             response =>
             {
                this.user = response['data'];
             },
             error =>
             {
               console.log(error);
             });
        });
  }

  saveUser() {
    if (this.user.id > 0) {
        this.updateUser(this.user);
    } else {
        this.createUser(this.user);
    }

  }

  updateUser(user: User)  {
    this.userService.updateUser(this.user).subscribe(
      response => {
          if(response['success']) {
             this.message = 'Utente ' + user.name + ' Modificato con successo';
             alert(this.message);
             this.router.navigate(['users']);
          } else {
            alert(response['message']);
          }
      },
      error =>
      {
        console.log(error);
      }
    );
  }

    createUser(user: User)  {
    this.userService.createUser(this.user).subscribe(
      response => {
          if(response['success']) {
            this.message = 'Utente ' + user.name + ' Inserito   con successo';
            alert('Utente ' + user.name + ' Inserito   con successo');
            this.router.navigate(['users']);
          } else {
            alert(response['message']);
           }
      },
      error =>
      {
        console.log(error);
      }
    );
  }

  deleteUser(user: User) {
    // cancellazione dell'utente

    const domanda = confirm('Sei sicuro di voler cancellare ' + user.name + ' ?');
    if (domanda === true) {
      this.userService.deleteUser(user).subscribe(
        response => {
            if(response['success']) {
                this.message = 'Utente ' + user.name + ' Cancellato con successo';
                alert(this.message);
                this.router.navigate(['users']);
            } else {
              alert(response['message']);
            }
       },
       // response => {
       //       alert(response['message']);  // reperisco il messaggio dal server
      //  },
      error => {
          console.log(error);
        }
        );
     }else{
      alert('Operazione annullata');
    }







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


