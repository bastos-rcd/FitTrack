import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/food';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css'
})

export class FoodListComponent {
  public foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private router: Router
  ) {
    this.foodService.getFoods().then((foods) => {
      this.foods = foods;
      this.foods.sort((a, b) => a.getName().localeCompare(b.getName()));
    });
  }

  public onDeleteFood(_name: string): void {
    if (confirm('Supprimer ' + _name + ' ?')) {
      this.foodService.deleteFood(_name).then(() => {
        this.foodService.getFoods().then((foods) => {
          this.foods = foods;
          this.foods.sort((a, b) => a.getName().localeCompare(b.getName()));
        });
      });
    }
  }
}