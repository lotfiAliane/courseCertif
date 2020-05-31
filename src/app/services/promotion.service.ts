import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion.model';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,private processHTTPMsgService:ProcessHTTPMsgService) { }

  getPromotions():Observable<Promotion[]>
  {
    return this.http.get<Promotion[]>(baseURL+'promotions').pipe(catchError(this.processHTTPMsgService.handleError));

  }
  getPromotion(id: string):Observable<Promotion>
  {
    
    return this.http.get<Promotion>(baseURL+'promotions'+id).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedPromotion():Observable<Promotion>{
   
    return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
