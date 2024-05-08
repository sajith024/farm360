import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAuthRoutingModule } from './app-auth-routing.module';
import { AppAuthComponent } from './app-auth.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppAuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppAuthRoutingModule
  ]
})
export class AppAuthModule { }
