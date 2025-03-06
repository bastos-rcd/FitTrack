import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css'
})

export class FoodListComponent {
  public foods: Food[] = [];

  constructor(
    private foodService: FoodService
  ) {
    this.foodService.getFoods().then((foods) => {
      this.foods = foods;
    });
  }

  public onDeleteFood(food: Food) { }
}