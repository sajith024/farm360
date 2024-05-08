import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () =>
      import('./page-errors/page-errors.module').then(
        (m) => m.PageErrorsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./app-auth/app-auth.module').then((m) => m.AppAuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./app-page/app-page.module').then((m) => m.AppPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
