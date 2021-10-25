import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
})
export class UserModule {}
