import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { tap } from 'rxjs/internal/operators';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request success', req);
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('Response success', evt);
        }
      })
    );
  }
}
