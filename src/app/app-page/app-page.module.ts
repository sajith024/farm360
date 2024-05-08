import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPageRoutingModule } from './app-page-routing.module';
import { AppPageComponent } from './app-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppHeaderComponent } from './app-header/app-header.component';


@NgModule({
  declarations: [
    AppPageComponent,
    DashboardComponent,
    AppHeaderComponent,
  ],
  imports: [
    CommonModule,
    AppPageRoutingModule
  ]
})
export class AppPageModule { }
