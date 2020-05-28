import { Injectable } from "@angular/core";
import { AUTH_CONFIG } from "./auth0-variables";
import { Router } from "@angular/router";
import auth0 from "auth0-js";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: "token id_token",
    redirectUri: AUTH_CONFIG.callbackURL,
  });

  constructor(public router: Router, public httpClient: HttpClient) {}

  public login(): void {
    this.auth0.authorize();
  }

  public async handleAuthentication(): Promise<any>{
      await this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = "";
          this.setSession(authResult);
        } else if (err) {
          // Error dialog ie
        }
      });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  }

  public logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.logoutFromAuth0();
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logoutFromAuth0(): void {
    window.location.href =
      `https://${environment.AUTH0_HOST}/logout?returnTo=${environment.AUTH0_LOGOUT_URL}&client_id=${environment.AUTH0_CLIENT_ID}`;
  }
}
