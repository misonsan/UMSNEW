import {Injectable} from '@angular/core';
import { User } from '../classes/user';



@Injectable()

export class UserService {
  users: User[] = [

    {
      id: 1,
      name: 'Hidran1',
      lastname: 'Arias',
      email: 'hidran@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Torino',
      phone: '454545455',
      age: 43
  } ,
  {
      id: 2,
      name: 'Hidran2',
      lastname: 'Arias',
      email: 'hidran2@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Milano',
      phone: '348 1234560',
      age: 25
  },
  {
      id: 3,
      name: 'Hidran3',
      lastname: 'Arias',
      email: 'hidran3@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Rovigo',
      phone: '348 4428676',
      age: 67
  },
  {
      id: 4,
      name: 'Hidran4',
      lastname: 'Arias',
      email: 'hidran@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Livigno',
      phone: '3802197123',
      age: 19
  }




  ];

  constructor() {
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number):  User {
      return  this.users.find(user => user.id === id);
  }



  deleteUser(user: User) {
         // determino indice dell'elemento da cancellare
    const index = this.users.indexOf(user);
    // controllo di avere un indice corretto
    if (index >= 0) {
      this.users.splice(index, 1);
    }

  }

  updateUser(user: User) {
      // aggiorno utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array
    const idx = this.users.findIndex((v) => v.id === user.id);
    // alert('l indice trovato da modificare: ' + idx);
    if (idx !== -1) {
      this.users[idx] = user;

      alert('userService - updateUser');
    }
  }


   createUser(user: User) {
    // inserisco utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array


   /*
      user.id = this.users.length + 1;
      alert('UserService -  create ' + user.id)
      this.users.splice(0,0,user);
      */


    alert('userService - Create');


    const indend = this.users.length;
    const indnew = indend + 1;
    user.id = indnew;
     alert('UserService -  create ' + user.id);
    this.users.splice(indend,0,user);
   }


/*
  ---------------------  gestione con array
 getUsers() {
    return this.users;
  }

  deleteUser(user: User) {
         // determino indice dell'elemento da cancellare
    const index = this.users.indexOf(user);
    // controllo di avere un indice corretto
    if (index >= 0) {
      this.users.splice(index, 1);
    }

  }

  updateUser(user: User) {
      // aggiorno utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array
    const idx = this.users.findIndex((v) => v.id === user.id);
    // alert('l indice trovato da modificare: ' + idx);
    if (idx !== -1) {
      this.users[idx] = user;
    }
  }


   createUser(user: User) {
    // inserisco utente con i dati dal form
    // attenzione: fatto per modifiche dei dati in array

      let indend = this.users.length;
      let indnew = indend + 1;
      user.id = indnew;
      this.users.splice(indend,0,user);
   }

*/




}

