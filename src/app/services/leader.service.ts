import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader.model';
import { LEADERS } from '../shared/LEADERS';
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
export class LeaderService {

  constructor(private http:HttpClient,private processHTTPMsgService:ProcessHTTPMsgService ) { }

  getLeaders():Observable<Leader[]>
  {
    return this.http.get<Leader[]>(baseURL+'leaders').pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getFeaterLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leaders?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));
   
  }
}
