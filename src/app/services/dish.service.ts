import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish.model';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Promise<Dish[]>{
    return new Promise(resolve =>{
      setTimeout(()=>resolve(DISHES), 2000);
    });
    return Promise.resolve(DISHES);
  }
  getDish(id:any): Promise<Dish> {
  
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
