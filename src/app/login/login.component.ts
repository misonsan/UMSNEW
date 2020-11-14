import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../classes/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  auth: AuthService, private router: Router) {

   }

  ngOnInit() {
    this.auth.usersignedin.subscribe(
      (user: User) => {
        this.router.navigate(['/']);
      }
    );
  }

  signIn(form: NgForm) {
    // alert(form.value.email);
    //alert('login --- signin - ctr_Form ' + form.valid);
      if(!form.valid) {
        return false;
      }
      let result = this.auth.signIn(form.value.email, form.value.password);
      //alert('login - esito login da auth ----->  ' + result);

      /*
      let mailLocStorage = localStorage.getItem('token');
      //alert('mailLocalStorAGE: ' + mailLocStorage);
      if(mailLocStorage) {
        this.router.navigate(['']);
      } else {
        alert('login - Anomalia in effettuazione Login');
      }  */
   }


   changePassword() {

    const domanda = confirm("Sei sicuro di voler Cambiare la Password ?");
    if (domanda === true) {
      this.router.navigate(['chgpwd']);
         }else{
      alert('Operazione annullata');
    }

  }

}

