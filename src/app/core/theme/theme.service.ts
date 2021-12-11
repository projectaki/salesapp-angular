import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { skip, take, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkMode: ReplaySubject<boolean> =
    new ReplaySubject<boolean>();
  darkMode$: Observable<boolean> = this.darkMode.asObservable();

  constructor() {}

  darkModeTrigger(val: boolean) {
    this.darkMode.next(val);
  }
}
