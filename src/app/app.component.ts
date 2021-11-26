import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: `<ng-container *ngIf="auth.user$ | async; else loading">
      <router-outlet></router-outlet>
    </ng-container>
    <ng-template #loading>
      <mat-spinner
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)"
      ></mat-spinner>
    </ng-template> `,
})
export class AppComponent {
  /**
   * Only render router outlet once the user observable emitted for consistent UI
   * @param auth Auth0 authentication service
   */
  constructor(public auth: AuthService) {}
}
