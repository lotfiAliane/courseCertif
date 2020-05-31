import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { FeedBack } from '../shared/feed-back.model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private processHTTPMsgService:ProcessHTTPMsgService, private http:HttpClient) { }
  submitFeedback(feedback:FeedBack):Observable<FeedBack>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<FeedBack>(baseURL+'feedback',feedback,httpOptions).pipe(catchError(this.processHTTPMsgService.handleError));
}
}
