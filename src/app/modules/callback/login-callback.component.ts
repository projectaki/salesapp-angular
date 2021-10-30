import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  template: '<div></div>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthenticationService
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
    }
  };

  private async _syncUser(authenticatedUser: any) {
    const user = await this.userService.getUser().pipe(take(1)).toPromise();

    if (!user)
      return this.userService
        .createUser({
          name: authenticatedUser?.name ?? '',
          email: authenticatedUser?.email ?? '',
          authId: authenticatedUser?.sub ?? '',
        })
        .subscribe();
    else
      return this.userService
        .updateUser({
          name: authenticatedUser?.name ?? '',
          email: authenticatedUser?.email ?? '',
          authId: authenticatedUser?.sub ?? '',
        })
        .subscribe();
  }
}
