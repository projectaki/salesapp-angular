/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserMetaDataInput } from "./../../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateUserMetadata
// ====================================================

export interface updateUserMetadata_updateUserMetadata {
  __typename: "User";
  authId: string;
}

export interface updateUserMetadata {
  updateUserMetadata: updateUserMetadata_updateUserMetadata;
}

export interface updateUserMetadataVariables {
  input: UserMetaDataInput;
}
