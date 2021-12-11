import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private unsub$ = new Subject();
  darkMode!: FormControl;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private theme: ThemeService
  ) {
    this.darkMode = this.fb.control(false);
  }

  ngOnInit(): void {
    this.darkMode.valueChanges
      .pipe(
        tap((x) => {
          this.theme.darkModeTrigger(x);
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();

    this.theme.darkMode$
      .pipe(
        tap((x) => {
          this.darkMode.setValue(x, { emitEvent: false });
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
