import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout',
  template: `<navbar></navbar>
    <router-outlet></router-outlet>
    <footer></footer>`,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
