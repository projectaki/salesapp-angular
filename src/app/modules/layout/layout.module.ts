import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { LoginLogoutButtonComponent } from './login-logout-button/login-logout-button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
    LoginLogoutButtonComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [],
})
export class LayoutModule {}
