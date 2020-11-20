import {Component, OnInit, Input} from '@angular/core';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';
import { faUndo, faSave, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
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
  faInfoCircle = faInfoCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  @Input() set user(user: User) {
    this.__user = user;
    this.usercopy = Object.assign({}, user);
  }

  get user() {
    return this.__user;
  }

  public textMessage1 = '';
  public textMessage2 = '';
  public textUser = '';
  public headerPopup = '';
  public perDebug = 'utente passato: ';
  public message = '';

  public alertSuccess = false;
  public savechange = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit() {
     this.user = new User();

     this.route.paramMap.subscribe(ret => {
        if (!ret.get('id')) {
            return;
        }
    //    alert('user-detail - letto utente passato ' + params.id);

        this.userService.getUser(+ret.get('id')).subscribe(
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
      this.savechange = true;
      this.alertSuccess = true;
  }

  updateUser(user: User)  {
    this.userService.updateUser(this.user).subscribe(
      response => {
          if(response['success']) {
             this.message = 'Utente ' + user.name + ' Modificato con successo';
           //  alert(this.message);
          //   this.router.navigate(['users']);
          } else {
            alert(response['message']);
            this.alertSuccess = false;
          }
      },
      error =>
      {
        console.log(error);
        this.alertSuccess = false;
      }
    );
  }

    createUser(user: User)  {
    this.userService.createUser(this.user).subscribe(
      response => {
          if(response['success']) {
            this.message = 'Utente ' + user.name + ' Inserito   con successo';

        //    il messaggio viene visualizzato sul dettaglio e il ritorno a elenco lo faccio a mano

        //    alert('Utente ' + user.name + ' Inserito   con successo');
       //     this.router.navigate(['users']);
          } else {
            alert(response['message']);
             this.alertSuccess = false;
           }
      },
      error =>
      {
        console.log(error);
        this.alertSuccess = false;
      }
    );
  }

  // metodo originario con messaggio tramite
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

// messaggio di abbandono cancellazione  - metodo creato con popup da Moreno
nodeleteUser() {
  // il messaggio di abbandono della cancellazione visualizzato sulla seconda maschera di popup
  // eseguo solo la navigazione a elenco utente

  this.router.navigate(['users']);

}

// metodo creato da moreno per gestire la conferma utente con Popup
confirmdeleteUser(user: User) {
  //  document.getElementById('modelDlt').close;

  // window.close();
  this.headerPopup = 'Conferma Cancellazione';
  this.textMessage1 = 'Sei sicuro di voler cancellare ';
  this.textUser = user.name;
  this.textMessage2 = '';
 }

 // metodo originario con messaggio tramite
 abortdeleteUser(user: User) {
  // cancellazione dell'utente
  //  chiudere la finestra popup  via codice

  // window.close();
  this.headerPopup = 'Abbandono Cancellazione';
  this.textMessage1 = 'cancellazione dell"utente  ';
  this.textUser = user.name;
  this.textMessage2 = ' abbandonata dall"operatore  ';
}

// eseguo la cancellazione dell'utente
yesdeleteUser(user)  {

  this.userService.deleteUser(user).subscribe(
    response => {
        if(response['success']) {
          this.headerPopup = 'Eseguita Cancellazione';
          this.textMessage1 = 'cancellazione dell"utente  ';
          this.textUser = user.name;
          this.textMessage2 = ' eseguita con successo  '

        } else {
          alert(response['message']);
        }
       },
        error => {
          console.log(error);
        }
    );
}




okconfirm()  {

  this.backToUsers();
  // faccio refresh della pagina - obbligatorio per riportarla usabile
  setTimeout("location.reload(true);");

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


