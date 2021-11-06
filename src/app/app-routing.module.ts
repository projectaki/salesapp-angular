import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCallbackComponent } from './modules/callback/login-callback.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';

const routes: Routes = [
  {
    component: LayoutComponent,
    path: '',
    children: [
      { component: HomeComponent, path: '' },
      { component: ProfileComponent, path: 'profile' },
    ],
  },
  { path: 'login-callback', component: LoginCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
