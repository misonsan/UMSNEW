import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  public alertSuccess = false;
  public savechangepwd = false;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {



  }

  ngOnInit() {
  }


  chgpwd(form : NgForm)  {

    alert('chgpwd - controllo per cambio password ---  da fare auth.chgpwd su auth. service');
    // da  fare
    // this.auth.signUp(form.value.name, form.value.email, form.value.password);

    if(!form.valid) {
      return false;
    }

    try {
              this.auth.getUserLong(form.value.name, form.value.email, form.value.password);    // gtest
              this.auth.chgpwd(form.value.username, form.value.email, form.value.newpassword);

     // const result = this.auth.chgpwd(form.value.name, form.value.email, form.value.password);
      this.savechangepwd = true;
      this.alertSuccess = true;

    } catch (ex) {
      this.alertSuccess = false;
      console.log(ex);
      alert('chgpwd - errore getUserLong da auth ----->  ' + ex);
    }










    //this.auth.chgpwd(form.value.name, form.value.email, form.value.newpassword);


    /*
    const result = this.auth.getUserLong(form.value.name, form.value.email, form.value.password);
    alert('ho letto il record dell"utente - ora vado a effettuare la modifica');
    if (result) {  // sono riuscito a leggere il record
      alert('e vai  !!!!!!!!!!!!!!');
      this.savechangepwd = true;
      this.alertSuccess = true;
    }
    */

  }


/*   updateUser(user: User)  {
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

*/



}


/*

constructor(fb : FormBuilder){
    this.form = fb.group({
      oldPassword : ['',
        Validators.required,
        PasswordValidators.validOldPassword],
      newPassword : ['',Validators.required],
      confirmPassword : ['',Validators.required]
    }, {
      validator : PasswordValidators.passwordsShouldMatch
    });
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
      }
    }


*/
