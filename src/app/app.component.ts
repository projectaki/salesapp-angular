import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ThemeService } from './core/theme/theme.service';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  template: `<div [hidden]="!(userService.user$ | async)">
      <router-outlet></router-outlet>
    </div>

    <mat-spinner
      *ngIf="!(userService.user$ | async)"
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
    private overlay: OverlayContainer,
    private theme: ThemeService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.initDarkMode();
    this.userService.user$.subscribe((x) =>
      this.theme.darkModeTrigger(x.user_metadata.darkMode)
    );
  }

  ngOnDestory() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  initDarkMode() {
    this.theme.darkMode$
      .pipe(
        tap((val) => {
          if (val) {
            document.body.classList.add('darkMode');
            this.overlay.getContainerElement().classList.add('darkMode');
          } else {
            document.body.classList.remove('darkMode');
            this.overlay.getContainerElement().classList.remove('darkMode');
          }
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }
}
