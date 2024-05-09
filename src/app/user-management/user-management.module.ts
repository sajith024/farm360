import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
