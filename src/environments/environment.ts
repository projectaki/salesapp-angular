// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    domain: 'dev--ihngka6.eu.auth0.com',
    clientId: 'YExphUsxSZurW3NGyT1X5qvj5YRcFymi',
    audience: 'https://sales-api-dev.com',
    httpInterceptor: {
      allowedList: ['http://localhost:3000/*'],
    },
    redirectUri: 'http://localhost:4200/login-callback',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
