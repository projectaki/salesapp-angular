import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UserCreateInput,
  UserUpdateInput,
} from 'src/types/graphql-global-types';

const GET_CURRENT_USER = gql`
  query getUser {
    getCurrentUser {
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      authId
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      authId
      name
      email
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.user = this.apollo
      .watchQuery<any>({
        query: GET_CURRENT_USER,
      })
      .valueChanges.pipe(map((res) => res.data.getCurrentUser));
  }

  getUser() {
    return this.apollo.watchQuery<any>({
      query: GET_CURRENT_USER,
    }).valueChanges;
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
