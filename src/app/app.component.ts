import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EMPTY, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from './core/user/user.service';
import { UserStore } from './core/user/user.store';

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
  private darkModeHandler = (val: boolean) => {
    if (val) {
      document.body.classList.add('darkMode');
      this.overlay.getContainerElement().classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
      this.overlay.getContainerElement().classList.remove('darkMode');
    }
  };

  private unsub$ = new Subject<any>();
  /**
   * Only render router outlet once the user observable emitted for consistent UI
   * @param auth Auth0 authentication service
   */
  constructor(
    public auth: AuthService,
    public userStore: UserStore,
    private overlay: OverlayContainer
  ) {}

  ngOnInit() {
    this.userStore.setAuthenticatedUser();
    this.initDarkmodeHandler();
  }

  ngOnDestory() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  /**
   * Listen to darkmode toggle, trigger change in themeservice and persist to db
   */
  private initDarkmodeHandler() {
    this.userStore.darkmode$
      .pipe(tap(this.darkModeHandler), takeUntil(this.unsub$))
      .subscribe();
  }
}
