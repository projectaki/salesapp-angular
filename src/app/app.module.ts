import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginCallbackComponent } from './callback-components/login-callback.component';
import { environment } from 'src/environments/environment';
import { GraphQLModule } from './graphql/graphql.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [AppComponent, LoginCallbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(environment.auth),
    GraphQLModule,
    HomeModule,
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, // Needed for REST, attaching token to requests
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
