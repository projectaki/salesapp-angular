/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface StoreSubscriptionInput {
  _id?: string | null;
}

export interface UserCreateInput {
  _id: string;
  name: string;
  email: string;
}

export interface UserMetadataInput {
  darkMode: boolean;
}

export interface UserUpdateInput {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  user_metadata?: UserMetadataInput | null;
  subscriptions?: StoreSubscriptionInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
