import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManagementComponent } from '../pages/main/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UsereditGuard implements CanDeactivate<UserManagementComponent> {
  canDeactivate(component: UserManagementComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.userUpdateForm.dirty) {
      const firstName =  component.userUpdateForm.get('firstName')?.value || 'New User';
      return confirm(`Navigate away and lose all changes to ${firstName}?`)
    }
    return true;
  }
  
}
// <li><button (click)="logout()">Log out</button> </li>