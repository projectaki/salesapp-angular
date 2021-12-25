import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { combineLatest, of, Subject } from 'rxjs';
import { mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';

/**
 * Redirect page after successful authentication for handling login callbacks
 */
@Component({
  template: '<div></div>',
})
export class LoginCallbackComponent {
  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit() {
    this._handleLogin();
  }

  /**
   * Login handler callback, redirect to main page when all actions complete
   */
  private _handleLogin = () => {
    this.auth.user$
      .pipe(take(1), switchMap(this._initUserCallback))
      .subscribe();
  };

  /**
   * Callback function for creating/updating user, if user is authenticated.
   * @param user Auth0 user.
   * @returns Returns observable of createOrUpdateUser method, or observable of null if not authenticated.
   */
  private _initUserCallback = (user: User | null | undefined) => {
    if (user) {
      return this.userService.saveUser({
        _id: user.sub!,
        name: user.name,
        email: user.email,
      });
    } else return of(null);
  };
}
