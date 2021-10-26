import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest } from 'rxjs';
import { concatMap, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  template: '<div></div>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.syncUser().then(() => this.router.navigate(['']));
  }

  syncUser = async () => {
    const authenticatedUser = await this.auth.user$.pipe(take(1)).toPromise();
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
