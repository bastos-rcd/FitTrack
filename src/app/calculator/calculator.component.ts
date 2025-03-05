import { Component } from '@angular/core';
import { Meal } from '../../models/meal';
import { Food } from '../../models/food';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  public meal: Meal;

  constructor(
  ) {
    this.meal = new Meal();
  }

  public onExport() { }
}