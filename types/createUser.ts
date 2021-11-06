/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserCreateInput } from "./../src/types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "User";
  _id: string;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  input: UserCreateInput;
}
