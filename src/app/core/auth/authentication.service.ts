import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(public authApi: AuthService) {
    this.checkAuthStatus();
  }

  logout() {
    this._removeAuthStatus();
    this.authApi.logout({ returnTo: environment.appUrl });
  }

  setAuthStatus() {
    localStorage.setItem('loggedIn', 'true');
  }

  private _removeAuthStatus() {
    localStorage.removeItem('loggedIn');
  }

  private _getAuthStatus() {
    return localStorage.getItem('loggedIn');
  }

  checkAuthStatus() {
    const persistedAuthBool = this._getAuthStatus();
    if (persistedAuthBool) {
      const isAuthed: boolean = JSON.parse(persistedAuthBool);
      this.isAuthenticated$.next(isAuthed);
    }
    this.authApi.isAuthenticated$.subscribe((x) => {
      this.isAuthenticated$.next(x);
    });
  }
}
