import { Component, Input } from '@angular/core';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.css'
})

export class FoodCardComponent {
  @Input() public food!: Food;

  constructor() { }
}