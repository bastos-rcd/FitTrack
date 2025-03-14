import { Component } from '@angular/core';
import { Meal } from '../../models/meal';
import { Food } from '../../models/food';
import { MealStoreService } from '../../services/meal-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  public meal: Observable<Meal>;
  public isExporting: boolean = false;

  constructor(
    private mealStore: MealStoreService
  ) {
    this.meal = this.mealStore.meal$;
  }
}