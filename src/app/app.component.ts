import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_CURRENT_USER = gql`
  query getUser {
    getCurrentUser {
      name
      email
    }
  }
`;

const PRODUCT = gql`
  query product {
    product(id: "1") {
      name
      price
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'salesapp-angular';

  user!: Observable<any>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.user = this.apollo
      .watchQuery<any>({
        query: GET_CURRENT_USER,
      })
      .valueChanges.pipe(map((res) => res.data.getCurrentUser));
  }
}
