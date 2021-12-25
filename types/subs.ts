/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subs
// ====================================================

export interface subs_authUser_subscriptions {
  __typename: "StoreSubscription";
  _id: string;
}

export interface subs_authUser {
  __typename: "User";
  subscriptions: subs_authUser_subscriptions[];
}

export interface subs {
  authUser: subs_authUser | null;
}
