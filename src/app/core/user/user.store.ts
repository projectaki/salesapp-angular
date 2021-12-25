import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { StoreSubEvent } from 'src/app/modules/stores/models/store-sub-event';
import { UserUpdateInput } from 'src/types/graphql-global-types';
import {
  authUser,
  authUser_authUser,
  authUser_authUser_subscriptions,
} from 'types/authUser';
import {
  saveUser_saveUser,
  saveUser_saveUser_subscriptions,
} from 'types/saveUser';
import { subs_authUser_subscriptions } from 'types/subs';
import { UserService } from './user.service';

export interface UserState {
  user: saveUser_saveUser;
}

@Injectable({
  providedIn: 'root',
})
export class UserStore extends ComponentStore<UserState> {
  readonly user$: Observable<saveUser_saveUser> = this.select(
    (state) => state.user
  );

  readonly darkmode$: Observable<boolean> = this.select(
    (state) => state.user.user_metadata.darkMode
  );

  readonly subs$: Observable<authUser_authUser_subscriptions[]> = this.select(
    (state) => state.user.subscriptions
  );

  /**
   * If user is authenticated then get the currently authenticated user info from backend
   * Then set the state of the user
   * Call once in app startup
   */
  public readonly setAuthenticatedUser = this.effect(
    (void$: Observable<void>) => {
      return void$.pipe(
        switchMap(() =>
          this.auth.user$.pipe(
            switchMap((u) => {
              if (u === null || u === undefined) {
                return EMPTY;
              }
              return this.userService.currentUser$.pipe(
                tapResponse(
                  (user) => {
                    if (!user) throw Error('User is null!');
                    this.setState({ user: user });
                  },
                  (error: HttpErrorResponse) => console.log(error)
                )
              );
            })
          )
        )
      );
    }
  );

  public readonly saveUser = this.effect(
    (input$: Observable<UserUpdateInput>) => {
      return input$.pipe(
        switchMap((i) =>
          this.userService.saveUser(i).pipe(
            tapResponse(
              (user) => this.setState({ user: user! }),
              (error: HttpErrorResponse) => console.log(error)
            )
          )
        )
      );
    }
  );

  readonly updateSubs = this.effect((event$: Observable<StoreSubEvent>) => {
    return event$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((event) => {
        if (event.val) return this.userService.addSub(event._id);
        else return this.userService.removeSub(event._id);
      }), //👇 Act on the result within inner pipe.
      tapResponse(
        (subs) => this.updateSubState(subs!),
        (error: HttpErrorResponse) => console.log(error)
      )
    );
  });

  constructor(private userService: UserService, private auth: AuthService) {
    super();
  }

  readonly updateSubState = this.updater(
    (state, subs: saveUser_saveUser_subscriptions[]) => ({
      user: { ...state.user, subscriptions: subs },
    })
  );

  // readonly addSubId = this.updater((state, id: string) => ({
  //   subIds: [...state.subIds, id],
  // }));
}
