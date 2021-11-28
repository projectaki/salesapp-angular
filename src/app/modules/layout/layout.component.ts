import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'layout',
  template: `<navbar></navbar>
    <router-outlet></router-outlet>
    <footer></footer>`,
})
export class LayoutComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
