export const environment = {
  production: true,
  auth: {
    domain: 'dev--ihngka6.eu.auth0.com',
    clientId: 'YExphUsxSZurW3NGyT1X5qvj5YRcFymi',
    audience: 'https://sales-api-dev.com',
    // httpInterceptor: { // for REST, when using the inerceptor
    //   allowedList: ['http://localhost:3000/*'],
    // },
    redirectUri: 'https://saleswezlangular.azurewebsites.net/login-callback', // Redirect here to handle successful login
  },
  graphqlServer: 'https://saleswezl.azurewebsites.net/graphql',
  appUrl: 'https://saleswezlangular.azurewebsites.net',
};
