import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader.model';
import { LEADERS } from '../shared/LEADERS';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Leader[]
  {
    return LEADERS;
  }

  getFeaterLeader():Leader{
    return LEADERS.filter((leader:Leader)=> (leader.featured == true))[0];
  }
}
