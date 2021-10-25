import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCallbackComponent } from './callback-components/login-callback.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: 'login-callback', component: LoginCallbackComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
