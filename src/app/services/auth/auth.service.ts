import { Injectable } from "@angular/core";
import { AUTH_CONFIG } from "./auth0-variables";
import { Router } from "@angular/router";
import auth0 from "auth0-js";
import { HttpClient } from "@angular/common/http";

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

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
      } else if (err) {
        // Error dialog ie
      }
      this.router.navigate(["/"]);
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
      "https://dev-v4wkhaae.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A4200&client_id=aLncGh3VIq29SbCTUY3l5P7FblxTBTnV";
  }
}
