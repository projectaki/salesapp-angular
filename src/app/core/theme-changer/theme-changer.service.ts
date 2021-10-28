import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangerService {}
