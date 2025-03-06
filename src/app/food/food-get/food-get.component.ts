import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../../models/meal';
import { MealStoreService } from '../../../services/meal-store.service';

@Component({
  selector: 'app-food-get',
  templateUrl: './food-get.component.html',
  styleUrl: './food-get.component.css'
})

export class FoodGetComponent {
  public meal: Observable<Meal>;
  public model: any = {};

  constructor(
    private mealStore: MealStoreService
  ) {
    this.meal = this.mealStore.meal$;
  }

  public onSubmit() { }
}