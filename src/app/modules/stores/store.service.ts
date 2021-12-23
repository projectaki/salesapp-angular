import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { stores } from 'types/stores';
import { StoreSubscription } from './store-subscription';

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

  storeSubs$: Observable<StoreSubscription[]> = combineLatest([
    this.stores$,
    this.userService.user$.pipe(map((u) => u?.subscriptions)),
  ]).pipe(
    map(([stores, subs]) => {
      return stores.map(
        (s) =>
          ({
            ...s,
            subscribed: subs?.map((x) => x._id).includes(s._id),
          } as StoreSubscription)
      );
    })
  );

  constructor(private apollo: Apollo, private userService: UserService) {}

  // saveUser(input: UserUpdateInput) {
  //   return this.apollo.mutate({
  //     mutation: SAVE_USER,
  //     variables: {
  //       input,
  //     },
  //   });
}
