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

const GET_SUBS = gql`
  query authUser {
    authUser {
      subscriptions {
        _id
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

const ADD_SUB = gql`
  mutation addSub($input: String!) {
    addSubscription(_id: $input) {
      subscriptions {
        _id
        name
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
      }
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

  /**
   * no-cache because we want a new backend call every time we call it,
   * this should be replaced by a global user state
   */
  subs$ = this.apollo
    .query<authUser>({
      query: GET_SUBS,
      fetchPolicy: 'no-cache',
    })
    .pipe(map((x) => x.data.authUser));

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

  addSub(input: string): Observable<string[]> {
    return this.apollo
      .mutate<addSub>({
        mutation: ADD_SUB,
        variables: {
          input,
        },
      })
      .pipe(
        map((x) => x.data?.addSubscription.subscriptions.map((x) => x._id)!)
      );
  }

  removeSub(input: string): Observable<string[]> {
    return this.apollo
      .mutate<removeSub>({
        mutation: REMOVE_SUB,
        variables: {
          input,
        },
      })
      .pipe(
        map((x) => x.data?.removeSubscription.subscriptions.map((x) => x._id)!)
      );
  }
}
