/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addSub
// ====================================================

export interface addSub_addSubscription_subscriptions {
  __typename: "StoreSubscription";
  _id: string;
  name: string | null;
}

export interface addSub_addSubscription {
  __typename: "User";
  subscriptions: addSub_addSubscription_subscriptions[];
}

export interface addSub {
  addSubscription: addSub_addSubscription;
}

export interface addSubVariables {
  input: string;
}
