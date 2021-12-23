import { Component, OnInit } from '@angular/core';
import { Store } from './store';
import { StoreService } from './store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  constructor(private storeService: StoreService) {}
  public stores$ = this.storeService.stores$;
  public subscribed = true;

  ngOnInit(): void {}
}
