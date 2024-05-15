import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoginGuard } from './guard/auth/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./app-auth/app-auth.module').then((m) => m.AppAuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app-page/app-page.module').then((m) => m.AppPageModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./page-errors/page-errors.module').then(
        (m) => m.PageErrorsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
