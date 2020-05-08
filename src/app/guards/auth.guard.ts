import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      return false;
    }
    return true;
  }
}
