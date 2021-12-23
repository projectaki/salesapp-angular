import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreSubscription } from '../store-subscription';

export interface StoreSubEvent {
  _id: string;
  isSub: boolean;
}

@Component({
  selector: 'store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent {
  @Input() storeSub!: StoreSubscription;
  @Output() subscribe: EventEmitter<StoreSubEvent> = new EventEmitter();

  onSubscribe(val: boolean) {
    this.subscribe.emit({ _id: this.storeSub._id, isSub: val });
  }
}
