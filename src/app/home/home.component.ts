import { Component, OnInit } from '@angular/core';
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
  constructor(private disheService: DishService, private promotionService:PromotionService,private leaderService:LeaderService) { }

  ngOnInit(): void {
    this.disheService.getFeaturedDish().then(dish => this.dish=dish);
    this.promotion=this.promotionService.getFeaturedPromotion();
    this.leader=this.leaderService.getFeaterLeader();
  }

}
