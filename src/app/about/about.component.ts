import { Component, OnInit,Inject } from '@angular/core';
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
leaderErrMsg:string;
leadersErrMsg:string;
  constructor(private leaderService: LeaderService,@Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    //this.leader=this.leaderService.getFeaterLeader();
    this.leaderService.getFeaterLeader().subscribe(leader=>this.leader= leader, errMsg => this.leaderErrMsg = errMsg);
    
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errMsg=>this.leadersErrMsg =errMsg);
  }

}
