import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  config: any;

  constructor(public auth: AuthService) {
    this.config = environment;
  }

  ngOnInit(): void {}

  async test() {}
}
