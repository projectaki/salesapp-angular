import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
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

  constructor(private apollo: Apollo, private userService: UserService) {}
}
