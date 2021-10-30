import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
