import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../../models/meal';
import { MealStoreService } from '../../../services/meal-store.service';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/food';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-get',
  templateUrl: './food-get.component.html',
  styleUrl: './food-get.component.css'
})

export class FoodGetComponent {
  public meal: Observable<Meal>;
  public food: Food | undefined;
  public foods: Food[] = [];

  public model: any = {};

  constructor(
    private mealStore: MealStoreService,
    private foodService: FoodService,
    private router: Router
  ) {
    this.meal = this.mealStore.meal$;
    this.foodService.getFoods().then((foods) => {
      this.foods = foods;
    });
  }

  public onSubmit() {
    if (this.model.foodName && this.model.portion) {
      const tempFood = this.foods.find((f) => f.getName() === this.model.foodName)!;
      const tempPortion = tempFood.getMacros(this.model.portion);
      this.food = new Food(
        tempFood.getName(),
        tempPortion.calories,
        tempPortion.proteins,
        tempPortion.carbs,
        tempPortion.fats
      );
    }
  }

  public onAddFood() {
    if (this.food) {
      this.mealStore.addFood(this.food);
      this.router.navigate(['/calculator']);
    }
  }
}