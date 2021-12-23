/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./../src/types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: saveUser
// ====================================================

export interface saveUser_saveUser {
  __typename: "User";
  _id: string;
}

export interface saveUser {
  saveUser: saveUser_saveUser;
}

export interface saveUserVariables {
  input: UserUpdateInput;
}
