import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { SortableDirective } from './user-management/sortable.directive';
import { NgbdSortableHeader } from './user-report/sortable.directive';
import { UserReportComponent } from './user-report/user-report.component';
import { IconsModule } from 'src/app/icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';



const routes: Routes = [  
  
  {
    path: '',
    component: MainComponent,
    children: [
      {
          path: '', 
          redirectTo : 'dashboard',
          pathMatch : 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent  
      },
      {
        // canDeactivate: [UsereditGuard],
        path: 'user-management', component: UserManagementComponent
      },
      {
        path: 'user-report', component: UserReportComponent
      },     
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'notification', component: NotificationComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    UserManagementComponent,
    UserReportComponent,
    ProfileComponent,
    NotificationComponent,
    SortableDirective,
    NgbdSortableHeader,
    MainComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipeModule,
    NgxDaterangepickerMd.forRoot(),
    OrderModule,
    NgbModule,
    NgSelectModule,
    IconsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA 
  ]
})
export class MainModule { }
