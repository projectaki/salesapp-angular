import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<div [hidden]="auth.isLoading$ | async">
      <router-outlet></router-outlet>
    </div>

    <mat-spinner
      *ngIf="auth.isLoading$ | async"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)"
    ></mat-spinner> `,
})
export class AppComponent {
  public loading = true;
  private unsub$ = new Subject<any>();
  /**
   * Only render router outlet once the user observable emitted for consistent UI
   * @param auth Auth0 authentication service
   */
  constructor(public auth: AuthService) {}
}
