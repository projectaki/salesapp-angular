import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { UserStore } from 'src/app/core/user/user.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private unsub$ = new Subject();
  darkMode: FormControl = this.fb.control(false);
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private userStore: UserStore
  ) {}

  ngOnInit(): void {
    this.setInitialFC();
    this.checkBoxChangeListener();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private checkBoxChangeListener() {
    this.darkMode.valueChanges
      .pipe(
        tap((x) => {
          this.userStore.saveUser({
            user_metadata: {
              darkMode: x,
            },
          });
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }

  private setInitialFC() {
    this.userStore.darkmode$
      .pipe(
        tap((x) => this.darkMode.setValue(x, { emitEvent: false })),
        take(1)
      )
      .subscribe();
  }
}
