/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./../src/types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createOrUpdateUser
// ====================================================

export interface createOrUpdateUser_createOrUpdateUser {
  __typename: "User";
  _id: string;
}

export interface createOrUpdateUser {
  createOrUpdateUser: createOrUpdateUser_createOrUpdateUser;
}

export interface createOrUpdateUserVariables {
  input: UserUpdateInput;
}
