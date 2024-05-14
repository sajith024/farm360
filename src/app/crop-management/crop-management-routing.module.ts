import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropListComponent } from './crop-list/crop-list.component';
import { CropCreateComponent } from './crop-create/crop-create.component';
import { CropEditComponent } from './crop-edit/crop-edit.component';

const routes: Routes = [
  { path: '', component: CropListComponent },
  { path: 'create', component: CropCreateComponent },
  { path: 'edit/:id', component: CropEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropManagementRoutingModule {}
