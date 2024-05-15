import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { PhoneCodeDropdownComponent } from './phone-code-dropdown/phone-code-dropdown.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserCreateComponent,
    PhoneCodeDropdownComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModalModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
  ],
})
export class UserManagementModule {}
