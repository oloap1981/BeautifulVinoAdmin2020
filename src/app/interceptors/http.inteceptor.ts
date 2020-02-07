import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSessionService } from '../services/appSession.service';
import { SessionService } from 'bvino-lib';

@Injectable()
export class BVHttpInterceptor implements HttpInterceptor {

  public loaderToShow: any;
  public presentLoader = true;

  constructor(
    public appSessionService: AppSessionService,
    public sessionService: SessionService,
    public router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenValue = this.appSessionService.get(this.sessionService.KEY_AUTH_TOKEN);
    request = request.clone({
      headers: new HttpHeaders({
        Authorization: tokenValue,
        'Content-Type': 'application/json'
      })
    });
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('event--->>>', event);
      }
      return event;
    }), catchError((x: HttpErrorResponse) => {
      return this.handleAuthError(x);
    }));
  }

  private handleAuthError(err: any): Observable<any> {
    // ---------- QUI SI DEVONO MAPPARE TUTTI I POSSIBILI ERRORI HTTP E IMPLEMENTARE LE CONSEGUENTI AZIONI
    this.appSessionService.clearAll();
    console.log('interceptor --->>> handling error: ' + err.status + ' ' + err.message);
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      this.router.navigate(['login']);
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}