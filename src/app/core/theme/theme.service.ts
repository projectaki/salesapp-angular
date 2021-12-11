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
  darkMode$: Observable<boolean> = this.darkMode.asObservable().pipe(
    tap((val) => {
      if (val) {
        document.body.classList.add('darkMode');
        this.overlay.getContainerElement().classList.add('darkMode');
      } else {
        document.body.classList.remove('darkMode');
        this.overlay.getContainerElement().classList.remove('darkMode');
      }
    })
  );

  constructor(private overlay: OverlayContainer) {}

  toggleDarkmode(val: boolean) {
    this.darkMode.next(val);
  }
}
