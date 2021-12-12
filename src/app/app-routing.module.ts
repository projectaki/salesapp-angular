import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginCallbackComponent } from './modules/callback/login-callback.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';

const routes: Routes = [
  // Login callback route
  {
    path: 'login-callback',
    component: LoginCallbackComponent,
  },
  // Private routes
  {
    component: LayoutComponent,
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { component: ProfileComponent, path: 'profile' },
      {
        path: 'stores',
        loadChildren: () =>
          import('./modules/stores/stores.module').then((m) => m.StoresModule),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  // Public routes
  {
    component: LayoutComponent,
    path: '',
    children: [{ component: HomeComponent, path: 'home' }],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
