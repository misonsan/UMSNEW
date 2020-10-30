import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { RouterModule, Routes} from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';




// definizione delle rotte - prima di definire R

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users/new',
    component: UserDetailComponent
  },
  {
    path: 'users/:id/edit',
    component: UserDetailComponent
  },
  {
    path: 'users/:id',
    component: UserDataComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    UserDetailComponent,
    NavComponent,
    ModalBasicComponent,
    UserDataComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
