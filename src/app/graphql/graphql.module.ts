import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { setContext } from '@apollo/client/link/context';
import { take } from 'rxjs/operators';

const uri = environment.graphqlServer;

export function createApollo(
  httpLink: HttpLink,
  authService: AuthService
): ApolloClientOptions<any> {
  const basic = setContext(() => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(async () => {
    const isAuthenticated = await authService.isAuthenticated$
      .pipe(take(1))
      .toPromise();
    // If user is authenticated then attach token to header
    const token = isAuthenticated
      ? await authService.getAccessTokenSilently().toPromise()
      : null;

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService], // Inject auth service
    },
  ],
})
export class GraphQLModule {}
