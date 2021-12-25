import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../models/store';
import { StoreSubEvent } from '../models/store-sub-event';

@Component({
  selector: 'store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent {
  @Input() store!: Store;
  @Input() isSub!: boolean;

  @Output() subscribe: EventEmitter<StoreSubEvent> = new EventEmitter();

  onSubscribe(val: boolean) {
    this.subscribe.emit({ _id: this.store._id, val });
  }
}
