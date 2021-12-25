import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  UserCreateInput,
  UserUpdateInput,
} from 'src/types/graphql-global-types';
import { addSub } from 'types/addSub';
import { authUser } from 'types/authUser';
import { removeSub } from 'types/removeSub';
import { saveUser } from 'types/saveUser';

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
      created_at
      updated_at
    }
  }
`;

const SAVE_USER = gql`
  mutation saveUser($input: UserUpdateInput!) {
    saveUser(input: $input) {
      _id
      name
      email
      created_at
      updated_at
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

const ADD_SUB = gql`
  mutation addSub($input: String!) {
    addSubscription(_id: $input) {
      subscriptions {
        _id
        name
        logoUrl
      }
    }
  }
`;

const REMOVE_SUB = gql`
  mutation removeSub($input: String!) {
    removeSubscription(_id: $input) {
      subscriptions {
        _id
        name
        logoUrl
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = this.apollo
    .query<authUser>({
      query: GET_AUTHENTICATED_USER,
    })
    .pipe(map((res) => res.data.authUser));

  constructor(private apollo: Apollo) {}

  saveUser(input: UserUpdateInput) {
    return this.apollo
      .mutate<saveUser>({
        mutation: SAVE_USER,
        variables: {
          input,
        },
      })
      .pipe(map((x) => x.data?.saveUser));
  }

  addSub(input: string) {
    return this.apollo
      .mutate<addSub>({
        mutation: ADD_SUB,
        variables: {
          input,
        },
      })
      .pipe(map((x) => x.data?.addSubscription.subscriptions));
  }

  removeSub(input: string) {
    return this.apollo
      .mutate<removeSub>({
        mutation: REMOVE_SUB,
        variables: {
          input,
        },
      })
      .pipe(map((x) => x.data?.removeSubscription.subscriptions));
  }
}
