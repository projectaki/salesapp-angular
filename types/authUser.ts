/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: authUser
// ====================================================

export interface authUser_authUser_user_metadata {
  __typename: "UserMetadata";
  darkMode: boolean;
}

export interface authUser_authUser_subscriptions {
  __typename: "StoreSubscription";
  _id: string;
  name: string | null;
  logoUrl: string | null;
}

export interface authUser_authUser {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  user_metadata: authUser_authUser_user_metadata;
  subscriptions: authUser_authUser_subscriptions[];
}

export interface authUser {
  authUser: authUser_authUser | null;
}
