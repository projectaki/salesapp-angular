import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {
  isSmall!: boolean;
  constructor(
    public auth: AuthenticationService,
    public bp: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.bp
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
  }
}
