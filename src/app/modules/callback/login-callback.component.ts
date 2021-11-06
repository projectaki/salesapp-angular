import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  template: '<div></div>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthenticationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin = async () => {
    await this._setInitialUserData();
    this.router.navigate(['']);
  };

  // Save user in db after login
  private _setInitialUserData = async () => {
    const authenticatedUser = await this.auth.authApi.user$
      .pipe(take(1))
      .toPromise();
    this.auth.setAuthStatus();
    if (authenticatedUser) {
      await this._syncUser(authenticatedUser);
      const isDark: string =
        authenticatedUser['https://wezl.io/user_metadata']['darkMode'] ??
        'false';
      localStorage.setItem('darkMode', isDark);
      this.themeService.toggleTheme(JSON.parse(isDark));
    }
  };

  private async _syncUser(authenticatedUser: User) {
    const user = await this.userService.getUser().pipe(take(1)).toPromise();
    if (!user.data.getCurrentUser)
      return this.userService
        .createUser({
          name: authenticatedUser?.name ?? '',
          email: authenticatedUser?.email ?? '',
          _id: authenticatedUser?.sub ?? '',
        })
        .subscribe();
    else
      return this.userService
        .updateUser({
          name: authenticatedUser?.name ?? '',
          email: authenticatedUser?.email ?? '',
          _id: authenticatedUser?.sub ?? '',
        })
        .subscribe();
  }
}
