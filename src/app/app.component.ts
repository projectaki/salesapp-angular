import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EMPTY, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ThemeService } from './core/theme/theme.service';
import { UserService } from './core/user/user.service';

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
  constructor(
    public auth: AuthService,
    private theme: ThemeService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.initDarkmodeHandler();
  }

  ngOnDestory() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  initDarkmodeHandler() {
    this.userService.user$
      .pipe(
        switchMap((u) => {
          if (u) {
            this.theme.toggleDarkmode(u.user_metadata.darkMode);
            return this.theme.darkMode$.pipe(
              switchMap((val) => {
                return this.userService.updateUser({
                  _id: u._id,
                  user_metadata: {
                    darkMode: val,
                  },
                });
              })
            );
          }
          return EMPTY;
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }
}
