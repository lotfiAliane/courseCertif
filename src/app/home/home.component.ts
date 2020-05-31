import { Component, OnInit,Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish.model';
import { Promotion } from '../shared/promotion.model';
import { Leader } from '../shared/leader.model';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
dish:Dish;
promotion:Promotion;
leader:Leader;
dishErrmsg:String;
  constructor(@Inject('BaseURL') public BaseURL,private disheService: DishService, private promotionService:PromotionService,private leaderService:LeaderService) { }

  ngOnInit(): void {
    this.disheService.getFeaturedDish().subscribe(dish => this.dish=dish,
      errMsg=>this.dishErrmsg = errMsg);
    this.promotion=this.promotionService.getFeaturedPromotion();
    this.leader=this.leaderService.getFeaterLeader();
  }

}
