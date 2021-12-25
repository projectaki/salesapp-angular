import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { stores_stores } from 'types/stores';
import { Store } from './models/store';
import { StoreSubEvent } from './models/store-sub-event';
import { StoreService } from './services/store.service';
import { StoreStore } from './services/store.store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  providers: [StoreStore],
})
export class StoresComponent implements OnInit, OnDestroy {
  // private unsub$ = new Subject<void>();
  public stores$ = this.storeService.stores$;
  constructor(
    public store: StoreStore,
    private storeService: StoreService,
    private u: UserService
  ) {}
  ngOnDestroy(): void {
    // this.unsub$.next();
    // this.unsub$.complete();
  }
  ngOnInit(): void {
    this.store.setUserSubIds();
    this.store.subIds$.subscribe((x) => console.log('IDS', x));
    // this.stores$.subscribe((x) => console.log('stores', x));
  }

  async onSubscribe(event: StoreSubEvent) {
    this.store.updateSubIds(event);
  }
}
