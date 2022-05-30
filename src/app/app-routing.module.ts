import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'auth',  loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
      path: 'main',  
      canActivate : [AuthGuard],
      loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }