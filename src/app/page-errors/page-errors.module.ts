import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageErrorsRoutingModule } from './page-errors-routing.module';
import { PageErrorsComponent } from './page-errors.component';


@NgModule({
  declarations: [
    PageErrorsComponent
  ],
  imports: [
    CommonModule,
    PageErrorsRoutingModule
  ]
})
export class PageErrorsModule { }
