import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
leader:Leader;
leaders:Leader[];
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leader=this.leaderService.getFeaterLeader();
    this.leaders=this.leaderService.getLeaders();
  }

}
