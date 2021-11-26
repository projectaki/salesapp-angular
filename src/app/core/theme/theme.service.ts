import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip, take, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeChange: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  themeChange$: Observable<boolean> = this.themeChange.asObservable().pipe(
    skip(1),
    tap((x) => {
      this.userService
        .updateUserMetadata({ key: 'darkMode', value: `${x}` })
        .subscribe();
      localStorage.setItem('darkMode', JSON.stringify(x));
      (x &&
        document.body.classList.add('darkMode') &&
        this.overlay.getContainerElement().classList.add('darkMode')) ||
        (!x &&
          document.body.classList.remove('darkMode') &&
          this.overlay.getContainerElement().classList.remove('darkMode'));
    })
  );
  constructor(
    private overlay: OverlayContainer,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.themeChange$.subscribe();
    this.setInitialTheme();
  }

  private setInitialTheme = () => {
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode) {
      this.themeChange.next(JSON.parse(isDarkMode));
    }
    this.auth.user$
      .pipe(
        take(1),
        tap((x) => {
          if (x) {
            const isDark: string =
              x['https://wezl.io/user_metadata']['darkMode'] ?? 'false';
            this.themeChange.next(JSON.parse(isDark));
          }
        })
      )
      .subscribe();
  };

  toggleTheme(val: boolean) {
    this.themeChange.next(val);
  }
}
