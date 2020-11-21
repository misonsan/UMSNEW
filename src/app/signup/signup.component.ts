import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.auth.usersignedup.subscribe( () => {
      this.router.navigate(['/']);
    });
  }

  // primo metdo da utilizzare  con primo metodo su auth.Service.Signup
  /*
  signUp(form : NgForm) {
    this.auth.signUp(form.value.name, form.value.email, form.value.password);

  }
 */

async signUp(form: NgForm) {
  if(!form.valid) {
   return false;
 }
  try {
    const resp = await this.auth.signUp(form.value.name, form.value.email, form.value.password).toPromise();
    alert(resp.user_name + ' Utente creato con successo ');
    this.router.navigate(['/']);

 } catch (e) {
     switch (e.status)  {
         case 401:
           alert(e.error.error);
           break;
         case 402:
          alert(e.statusText);
          break;
         case 404:
           alert(e.header.message);
           break;
         case 500:
           alert('contattare il server');
           break;
     }
 }
}









}

