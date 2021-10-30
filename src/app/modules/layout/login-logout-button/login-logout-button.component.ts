import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'login-logout-button',
  templateUrl: 'login-logout-button.component.html',
})
export class LoginLogoutButtonComponent implements OnInit {
  constructor(public auth: AuthenticationService) {}

  ngOnInit(): void {}
}
