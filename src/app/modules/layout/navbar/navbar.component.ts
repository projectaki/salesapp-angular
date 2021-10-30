import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { take, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  darkMode!: FormControl;
  constructor(
    private fb: FormBuilder,
    public auth: AuthenticationService,
    private themeService: ThemeService
  ) {
    this.darkMode = this.fb.control('');
  }

  ngOnInit(): void {
    this._initDarkModeListener();
  }

  private _initDarkModeListener() {
    this.themeService.themeChange$
      .pipe(
        take(1),
        tap((x) => {
          console.log(x);
          this.darkMode.setValue(x);
        })
      )
      .subscribe();
    this.darkMode.valueChanges
      .pipe(tap((x) => this.themeService.toggleTheme(x)))
      .subscribe();
  }
}
