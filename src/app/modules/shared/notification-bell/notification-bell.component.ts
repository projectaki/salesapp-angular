import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent implements OnInit {
  @Input() subscribed!: boolean;
  @Output() subscribeClick = new EventEmitter<boolean>();

  public iconString!: string;
  public bellColor!: string;

  constructor() {}

  ngOnInit(): void {
    this.iconString = this.subscribed
      ? 'notifications_active'
      : 'notifications_none';

    this.bellColor = this.subscribed ? '#e5eb34' : '#ad9458';
  }

  onMouseEnter() {
    this.iconString = this.subscribed ? 'notifications_off' : 'notifications';
    this.bellColor = this.subscribed ? '#ff0a0a' : '#ad9458';
  }

  onMouseLeave() {
    this.iconString = this.subscribed
      ? 'notifications_active'
      : 'notifications_none';
    this.bellColor = this.subscribed ? '#e5eb34' : '#ad9458';
  }

  onMouseClick() {
    this.iconString = this.subscribed
      ? 'notifications_none'
      : 'notifications_active';
    this.bellColor = this.subscribed ? '#ad9458' : '#e5eb34';
    this.subscribed = !this.subscribed;
    this.subscribeClick.emit(this.subscribed);
  }
}
