import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  UserCreateInput,
  UserUpdateInput,
} from 'src/types/graphql-global-types';
import { authUser } from 'types/authUser';

const GET_AUTHENTICATED_USER = gql`
  query authUser {
    authUser {
      _id
      name
      email
      user_metadata {
        darkMode
      }
      subscriptions {
        _id
        name
        logoUrl
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      _id
    }
  }
`;

const SAVE_USER = gql`
  mutation saveUser($input: UserUpdateInput!) {
    saveUser(input: $input) {
      _id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = this.auth.user$.pipe(
    switchMap((u) => {
      if (u === null || u === undefined) {
        return of(null);
      }
      return this.currentUser$;
    }),
    shareReplay(1)
  );
  currentUser$ = this.apollo
    .watchQuery<authUser>({
      query: GET_AUTHENTICATED_USER,
    })
    .valueChanges.pipe(map((res) => res.data.authUser));

  constructor(private apollo: Apollo, private auth: AuthService) {}

  saveUser(input: UserUpdateInput) {
    return this.apollo.mutate({
      mutation: SAVE_USER,
      variables: {
        input,
      },
    });
  }

  createUser(input: UserCreateInput) {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        input,
      },
    });
  }
}
