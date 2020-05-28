import { environment } from '../../../environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: `${environment.AUTH0_CLIENT_ID}`,
  domain: "dev-v4wkhaae.eu.auth0.com",
  callbackURL: `${environment.AUTH0_CALLBACK_URL}`
};
