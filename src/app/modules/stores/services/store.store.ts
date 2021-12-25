import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { StoreSubEvent } from '../models/store-sub-event';
import { StoreService } from './store.service';

export interface StoreState {
  subIds: string[];
}

@Injectable()
export class StoreStore extends ComponentStore<StoreState> {
  readonly subIds$: Observable<string[]> = this.select((state) => state.subIds);

  /**
   * Get the subscriptions of the currently authenticated user
   */
  readonly setUserSubIds = this.effect((userId$: Observable<void>) => {
    return userId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(() =>
        this.userService.subs$.pipe(
          map((u) => u?.subscriptions.map((s) => s._id)),
          //👇 Act on the result within inner pipe.
          tapResponse(
            (subIds) => this.setState({ subIds: subIds! }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly updateSubIds = this.effect((event$: Observable<StoreSubEvent>) => {
    return event$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((event) => {
        if (event.val) return this.userService.addSub(event._id);
        else return this.userService.removeSub(event._id);
      }), //👇 Act on the result within inner pipe.
      tapResponse(
        (subIds) => this.setState({ subIds }),
        (error: HttpErrorResponse) => console.log(error)
      )
    );
  });

  constructor(private userService: UserService) {
    super();
  }

  // readonly addSubId = this.updater((state, id: string) => ({
  //   subIds: [...state.subIds, id],
  // }));

  // readonly removeSubId = this.updater((state, id: string) => ({
  //   subIds: state.subIds.filter((x) => x !== id),
  // }));
}
