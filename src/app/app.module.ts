import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev--ihngka6.eu.auth0.com',
      clientId: 'YExphUsxSZurW3NGyT1X5qvj5YRcFymi',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
