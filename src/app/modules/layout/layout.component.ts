import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'layout',
  template: `<ng-container *ngIf="!(auth.isLoading$ | async); else loading">
      <navbar></navbar>
      <router-outlet></router-outlet>
      <footer></footer>
    </ng-container>
    <ng-template #loading>
      <mat-spinner
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)"
      ></mat-spinner>
    </ng-template> `,
})
export class LayoutComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
