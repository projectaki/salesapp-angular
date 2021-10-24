import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo, gql } from 'apollo-angular';

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
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getCurrentUser {
              name
              email
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }
}
