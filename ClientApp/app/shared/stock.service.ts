import { Injectable, Inject, Injector } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptionsArgs, RequestOptions } from '@angular/http';

//import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ILogo } from '../models/Logo';
import { HttpParams } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http/src/params';
//import { RequestOptions } from '@angular/http/src/base_request_options';

@Injectable()
export class StockService {


  constructor(
    private httpClient: Http,
    private injector: Injector,
  ) {

  }
  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getStockSymbols() {

    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    headers.append("Access-Control-Allow-Origin", "*");
   
    return this.httpClient.get('/api/myapp/GetStockSymbolFromAPI',
      { withCredentials: true, headers })
      .map(res => res.json());
  }


  GetStockLogoAPI(symbol: string) {

    return this.httpClient.get('/api/myapp/GetStockLogoAPI?symbol=' + symbol)
      .map(res => res.json());
  }


  GetStockPriceAPI(symbol: string) {

    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    headers.append("Access-Control-Allow-Origin", "*");

    return this.httpClient.get('/api/myapp/GetStockPriceAPI?symbol=' + symbol,
     { withCredentials: true, headers })
      .map(res => res.json());
  }


  GetStockCompanyInfoAPI(symbol: string) {

    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    headers.append("Access-Control-Allow-Origin", "*");

    return this.httpClient.get('/api/myapp/GetStockCompanyAPI?symbol=' + symbol)
     // { withCredentials: true, headers })
      .map(res => res.json());
  }

}
