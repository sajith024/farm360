import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorInternalServerComponent } from './error-internal-server/error-internal-server.component';
import { ErrorUnauthorizedComponent } from './error-unauthorized/error-unauthorized.component';
import { PageErrorsComponent } from './page-errors.component';

const routes: Routes = [
  { path: '', component: PageErrorsComponent },
  { path: 'internal', component: ErrorInternalServerComponent },
  { path: 'unauthorized', component: ErrorUnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageErrorsRoutingModule {}
