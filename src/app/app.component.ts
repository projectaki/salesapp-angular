import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
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
