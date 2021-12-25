/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./../src/types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: saveUser
// ====================================================

export interface saveUser_saveUser_user_metadata {
  __typename: "UserMetadata";
  darkMode: boolean;
}

export interface saveUser_saveUser_subscriptions {
  __typename: "StoreSubscription";
  _id: string;
  name: string | null;
  logoUrl: string | null;
}

export interface saveUser_saveUser {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  created_at: any;
  updated_at: any;
  user_metadata: saveUser_saveUser_user_metadata;
  subscriptions: saveUser_saveUser_subscriptions[];
}

export interface saveUser {
  saveUser: saveUser_saveUser;
}

export interface saveUserVariables {
  input: UserUpdateInput;
}
