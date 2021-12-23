import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { StoreSubEvent } from './store-card/store-card.component';
import { StoreSubscription } from './store-subscription';
import { StoreService } from './store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit, OnDestroy {
  public storeSubs: StoreSubscription[] = [];
  private unsub$ = new Subject<void>();
  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
  ngOnInit(): void {
    this.storeService.storeSubs$
      .pipe(
        tap((x) => (this.storeSubs = x)),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }

  async onSubscribe({ _id }: StoreSubEvent) {
    const newSubs = this.storeSubs.map((s) => {
      if (s._id === _id) return { ...s, subscribed: !s.subscribed };
      return s;
    });

    const user = await this.userService.currentUser$.pipe(take(1)).toPromise();

    await this.userService
      .saveUser({
        _id: user?._id,
        subscriptions: newSubs
          .filter((s) => s.subscribed)
          .map(({ _id }) => ({ _id })),
      })
      .pipe(take(1))
      .toPromise();

    this.storeSubs = newSubs;
  }
}
