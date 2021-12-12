import { Component, OnInit } from '@angular/core';
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { faBell as solidBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  faBell = faBell;
  faBellSlash = faBellSlash;

  selectedIcon = faBell;
  constructor() {}

  ngOnInit(): void {}

  onMouseEnter() {
    this.selectedIcon = solidBell;
  }

  onMouseLeave() {
    this.selectedIcon = faBell;
  }
}
