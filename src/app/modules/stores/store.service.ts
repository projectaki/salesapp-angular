import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map, shareReplay } from 'rxjs/operators';
import { stores } from 'types/stores';

const GET_ALL_STORES = gql`
  query stores {
    stores {
      _id
      name
      logoUrl
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  stores$ = this.apollo
    .watchQuery<stores>({
      query: GET_ALL_STORES,
    })
    .valueChanges.pipe(
      map((res) => res.data.stores),
      shareReplay(1)
    );

  constructor(private apollo: Apollo) {}

  // saveUser(input: UserUpdateInput) {
  //   return this.apollo.mutate({
  //     mutation: SAVE_USER,
  //     variables: {
  //       input,
  //     },
  //   });
}
