/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeSub
// ====================================================

export interface removeSub_removeSubscription_subscriptions {
  __typename: "StoreSubscription";
  _id: string;
  name: string | null;
  logoUrl: string | null;
}

export interface removeSub_removeSubscription {
  __typename: "User";
  subscriptions: removeSub_removeSubscription_subscriptions[];
}

export interface removeSub {
  removeSubscription: removeSub_removeSubscription;
}

export interface removeSubVariables {
  input: string;
}
