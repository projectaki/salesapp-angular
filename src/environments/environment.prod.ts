export const environment = {
  production: true,
  auth: {
    domain: 'sales-app-staging.eu.auth0.com',
    clientId: 'YmgcJtOElp8kLMoDBD5HkJXxtlT4wJrL',
    audience: 'https://sales-api-dev.com',
    // httpInterceptor: { // for REST, when using the inerceptor
    //   allowedList: ['http://localhost:3000/*'],
    // },
    redirectUri: 'https://saleswezlangular.azurewebsites.net/login-callback', // Redirect here to handle successful login
  },
  graphqlServer: 'https://saleswezl.azurewebsites.net/graphql',
  appUrl: 'https://saleswezlangular.azurewebsites.net',
};
