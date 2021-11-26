import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {
  public isSmall!: boolean;
  private unsub$ = new Subject<any>();
  constructor(public auth: AuthService, public bp: BreakpointObserver) {}

  ngOnInit(): void {
    this.bp
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.unsub$))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
  }
}
