import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorInternalServerComponent } from './error-internal-server/error-internal-server.component';
import { ErrorUnauthorizedComponent } from './error-unauthorized/error-unauthorized.component';
import { PageErrorsRoutingModule } from './page-errors-routing.module';
import { PageErrorsComponent } from './page-errors.component';

@NgModule({
  declarations: [
    PageErrorsComponent,
    ErrorInternalServerComponent,
    ErrorUnauthorizedComponent,
  ],
  imports: [CommonModule, PageErrorsRoutingModule],
})
export class PageErrorsModule {}
