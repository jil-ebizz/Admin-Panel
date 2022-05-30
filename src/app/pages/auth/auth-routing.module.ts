import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component'

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
        {
            path: '',
            redirectTo : 'login',
            pathMatch : 'full'
        },
        {
          path: 'login', component: LoginComponent
        },
        {
          path: 'forgot-password', component: ForgotPasswordComponent
        },
        {
          path: 'reset-password', component: ResetPasswordComponent
        }
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }