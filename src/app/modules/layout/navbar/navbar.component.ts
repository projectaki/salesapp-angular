import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  darkMode!: FormControl;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private overlay: OverlayContainer
  ) {
    this.darkMode = this.fb.control('');
  }

  ngOnInit(): void {
    this.initDarkModeListener();
    this.setInitialTheme();
  }

  setInitialTheme = async () => {
    const user = await this.auth.user$.pipe(take(1)).toPromise();
    const isDark: boolean =
      user != null && user['https://wezl.io/user_metadata'].darkMode;
    this.darkMode.setValue(isDark);
  };

  initDarkModeListener() {
    this.darkMode.valueChanges.subscribe((x) => {
      console.log(x); // Save preference to user metadata
      (x &&
        document.body.classList.add('darkMode') &&
        this.overlay.getContainerElement().classList.add('darkMode')) ||
        (!x &&
          document.body.classList.remove('darkMode') &&
          this.overlay.getContainerElement().classList.remove('darkMode'));
    });
  }
}
