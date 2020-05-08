import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("id_token");

    if (token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
