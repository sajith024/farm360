import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorsComponent } from './page-errors.component';

const routes: Routes = [{ path: '', component: PageErrorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageErrorsRoutingModule { }
