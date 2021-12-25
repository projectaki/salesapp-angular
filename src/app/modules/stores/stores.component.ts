import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { UserStore } from 'src/app/core/user/user.store';
import { stores_stores } from 'types/stores';
import { Store } from './models/store';
import { StoreSubEvent } from './models/store-sub-event';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  public stores$ = this.storeService.stores$;
  public subIds$ = this.userStore.subs$.pipe(map((s) => s.map((x) => x._id)));

  constructor(
    private storeService: StoreService,
    private userStore: UserStore
  ) {}

  async onSubscribe(event: StoreSubEvent) {
    this.userStore.updateSubs(event);
  }
}
