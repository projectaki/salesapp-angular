import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresRoutingModule } from './stores-routing.module';
import { Routes } from '@angular/router';
import { StoresComponent } from './stores.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { StoreCardComponent } from './store-card/store-card.component';
@NgModule({
  declarations: [StoresComponent, StoreCardComponent],
  imports: [CommonModule, StoresRoutingModule, SharedModule],
})
export class StoresModule {}
