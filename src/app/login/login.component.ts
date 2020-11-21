import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../classes/User';
import { AuthService } from '../services/auth.service';

interface Jwt {
  // definisco l'interfaccia dei dati che ottengo dalla chiamata di login
      access_token: string;
      token_type: string;
      expires_in: number;
  // parametri aggiuntivi - vedi AuthController in laraapi
      user_name: string;
      email: string;
      password: string;
  }

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

  // vertsione in cui sposto il subscribe nel componente e non nel service
  // prima versione   --- funziona
  /*
  signIn(form: NgForm) {
       if(!form.valid) {
        return false;
      }
       this.auth.signIn(form.value.email, form.value.password)
            .subscribe(
              (_payload: Jwt) => {
                 alert('login eseguito con successo');
                this.router.navigate(['/']);
              },
              ({error}) =>{
                alert(error.error);
                console.log(error)
              }
            );
    }  */





 // vertsione in cui sposto il subscribe nel componente e non nel service
  // seconda versione - Utilizzo di async-awai  (più performante con meno codice)

  async signIn(form: NgForm) {
    if(!form.valid) {
     return false;
   }
   try {
     /*
    const resp = await this.auth.signIn(form.value.email, form.value.password).toPromise();
      alert('login corretto per utente:  ' + resp.user_name);
      this.router.navigate(['/']);  */
      const resp = await this.auth.signIn(form.value.email, form.value.password)
      .toPromise();
    alert(resp.user_name + ' logged in successfully');
    this.router.navigate(['/']);

   } catch (e) {
       switch(e.status)  {
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

   changePassword() {

    const domanda = confirm("Sei sicuro di voler Cambiare la Password ?");
    if (domanda === true) {
      this.router.navigate(['chgpwd']);
         }else{
      alert('Operazione annullata');
    }

  }

}

