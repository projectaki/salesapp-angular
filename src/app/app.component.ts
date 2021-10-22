import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'salesapp-angular';
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public http: HttpClient
  ) {}

  ngOnInit() {}
}
