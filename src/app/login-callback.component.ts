import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '<div></div>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('save user data to local db');
    this.router.navigate(['']);
  }
}
