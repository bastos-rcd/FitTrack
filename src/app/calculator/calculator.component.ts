import { Component } from '@angular/core';
import { MealStoreService } from '../../services/meal-store.service';
import { Meal } from '../../models/meal';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  public meal: Meal;

  constructor(
    private mealStoreService: MealStoreService
  ) {
    this.meal = this.mealStoreService.meal;
  }

  public onExport() { }
}