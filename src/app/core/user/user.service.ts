import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  UserCreateInput,
  UserUpdateInput,
} from 'src/types/graphql-global-types';
import { getUser, getUser_getCurrentUser } from 'types/getUser';

const GET_CURRENT_USER = gql`
  query getUser {
    getCurrentUser {
      _id
      name
      email
      user_metadata {
        darkMode
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

const CREATE_OR_UPDATE_USER = gql`
  mutation createOrUpdateUser($input: UserUpdateInput!) {
    createOrUpdateUser(input: $input) {
      _id
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
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
    .watchQuery<getUser>({
      query: GET_CURRENT_USER,
    })
    .valueChanges.pipe(map((res) => res.data.getCurrentUser));

  constructor(private apollo: Apollo, private auth: AuthService) {}

  getUser() {
    return this.apollo
      .watchQuery<getUser_getCurrentUser>({
        query: GET_CURRENT_USER,
      })
      .valueChanges.pipe(map((res) => res.data));
  }

  createOrUpdateUser(input: UserUpdateInput) {
    return this.apollo.mutate({
      mutation: CREATE_OR_UPDATE_USER,
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

  updateUser(input: UserUpdateInput) {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: { input },
    });
  }
}
