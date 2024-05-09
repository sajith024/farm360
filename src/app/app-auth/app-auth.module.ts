import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAuthRoutingModule } from './app-auth-routing.module';
import { AppAuthComponent } from './app-auth.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppAuthComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    AppAuthRoutingModule,
  ]
})
export class AppAuthModule { }
