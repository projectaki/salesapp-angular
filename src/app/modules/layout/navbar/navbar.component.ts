import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { ThemeService } from 'src/app/core/theme/theme.service';

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
    this._initDarkModeListener(); // has to be in constructor other wont load after navigate
  }

  ngOnInit(): void {}

  private _initDarkModeListener() {
    const sliderVal = localStorage.getItem('darkMode');
    if (sliderVal) {
      this.darkMode.setValue(JSON.parse(sliderVal));
    }
    // set initial value for slider
    this.themeService.themeChange$
      .pipe(
        take(1),
        tap((x) => {
          this.darkMode.setValue(x);
        })
      )
      .subscribe();
    // when slider changes, set the theme to change in service
    this.darkMode.valueChanges
      .pipe(tap((x) => this.themeService.toggleTheme(x)))
      .subscribe();
  }
}
