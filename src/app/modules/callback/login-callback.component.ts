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
    this.auth.setAuthStatus();
    await this.syncUser();
    this.router.navigate(['']);
  };

  // Save user in db after login
  syncUser = async () => {
    const authenticatedUser = await this.auth.authApi.user$
      .pipe(take(1))
      .toPromise();
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
  };
}
