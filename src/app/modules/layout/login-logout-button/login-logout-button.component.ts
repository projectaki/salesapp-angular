import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'login-logout-button',
  templateUrl: 'login-logout-button.component.html',
})
export class LoginLogoutButtonComponent implements OnInit {
  config: any;

  constructor(public auth: AuthService) {
    this.config = environment;
  }

  ngOnInit(): void {}
}
