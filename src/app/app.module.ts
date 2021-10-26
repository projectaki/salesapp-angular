import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { GraphQLModule } from './graphql/graphql.module';
import { HomeModule } from './modules/home/home.module';
import { CallbackModule } from './modules/callback-components/callback.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(environment.auth),
    GraphQLModule,
    HomeModule,
    CallbackModule,
    BrowserAnimationsModule,
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, // Needed for REST, attaching token to requests
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
