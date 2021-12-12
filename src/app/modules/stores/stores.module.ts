import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresRoutingModule } from './stores-routing.module';
import { Routes } from '@angular/router';
import { StoresComponent } from './stores.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [StoresComponent],
  imports: [CommonModule, StoresRoutingModule, SharedModule],
})
export class StoresModule {}
