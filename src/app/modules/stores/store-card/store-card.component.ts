import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../store';

@Component({
  selector: 'store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  @Input() store!: Store;
  @Input() subscribed!: boolean;

  constructor() {}

  ngOnInit(): void {}

  onSubscribe(val: boolean) {
    console.log((val && 'sub') || 'unsub');
  }
}
