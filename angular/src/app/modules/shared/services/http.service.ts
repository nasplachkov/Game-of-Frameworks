import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { take } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers: HttpHeaders = new HttpHeaders();

  private DEFAULT_REQUEST_OPTIONS = {
    headers: this.headers,
    responseType: 'json'
  };

  constructor(public http: HttpClient) {
  }

  private generateRequestOptions(reqOpts = {}): any {
    return { ...this.DEFAULT_REQUEST_OPTIONS, ...reqOpts };
  }

  private generateUrlParams(params: any): HttpParams {
    return new HttpParams({ fromObject: params });
  }

  public get(url: string, urlParams: any = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.get(url, requestOptions).pipe(take(1));
  }

  public post(url: string, data: any = {}, urlParams: any = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.post(url, data, requestOptions).pipe(take(1));
  }

  public put(url: string, data: any = {}, urlParams: any = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.put(url, data, requestOptions).pipe(take(1));
  }

  public delete(url: string, urlParams: any = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.delete(url, requestOptions).pipe(take(1));
  }

  public patch(url: string, data: any = {}, urlParams: any = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.patch(url, data, requestOptions).pipe(take(1));
  }

}
