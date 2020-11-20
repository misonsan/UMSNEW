import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuardService } from './services/route-guard.service';
import { UserDataComponent } from './user-data/user-data.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';

const routes: Routes = [

  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/new',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id',
    component: UserDataComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id/edit',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'chgpwd',
    component: ChangepwdComponent
  }



  /*
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
    canActivate: [RouteGuarsService]
  },
  {
    path: 'users/new',
    component: UserDetailComponent,
    canActivate: [RouteGuarsService]
  },
  {
    path: 'users/:id/edit',
    component: UserDetailComponent,
    canActivate: [RouteGuarsService]  // rotta viibile solo se ho fatto il login
  },
  {
    path: 'users/:id',
    component: UserDataComponent,
    canActivate: [RouteGuarsService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'chgpwd',
    component: ChangepwdComponent
  }
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule],
  providers: [RouteGuardService]
})
export class AppRoutingModule { }
