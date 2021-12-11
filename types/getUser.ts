/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getCurrentUser_user_metadata {
  __typename: "UserMetadata";
  darkMode: boolean;
}

export interface getUser_getCurrentUser {
  __typename: "User";
  _id: string;
  name: string;
  email: string;
  user_metadata: getUser_getCurrentUser_user_metadata;
}

export interface getUser {
  getCurrentUser: getUser_getCurrentUser | null;
}
