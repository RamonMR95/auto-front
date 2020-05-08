interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: "aLncGh3VIq29SbCTUY3l5P7FblxTBTnV",
  domain: "dev-v4wkhaae.eu.auth0.com",
  callbackURL: "http://localhost:4200/callback"
};
