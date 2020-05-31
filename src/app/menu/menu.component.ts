import { Component, OnInit,Inject, Optional } from '@angular/core';
import { Dish } from '../shared/dish.model';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
//import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
dishes:Dish[] ;
errMess: string;

   selectedDish :Dish;
  constructor(private dishService:DishService, @Inject('BaseURL') public BaseURL) {
    
   
    
   }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes=dishes;
      console.log(this.dishes);
      
    },
    errmess => this.errMess = <any>errmess);
    }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
