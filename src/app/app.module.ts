import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginCallbackComponent } from './login-callback.component';

@NgModule({
  declarations: [AppComponent, LoginCallbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev--ihngka6.eu.auth0.com',
      clientId: 'YExphUsxSZurW3NGyT1X5qvj5YRcFymi',
      audience: 'https://sales-api-dev.com',
      httpInterceptor: {
        allowedList: ['http://localhost:3000/*'],
      },
      redirectUri: 'http://localhost:4200/login-callback',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
