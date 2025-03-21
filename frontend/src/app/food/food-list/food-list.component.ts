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
  public isLoaded = false;
  public isErrored = false;

  public foods: Food[] = [];
  public nbFoods: number = 0;

  constructor(
    private foodService: FoodService,
    private router: Router
  ) {
    this.foodService.getFoods().subscribe({
      next: (data) => {
        this.foods = data.foods;
        this.nbFoods = data.nbFoods;
        console.log(this.foods);
        this.foods.sort((a, b) => a.name.localeCompare(b.name));
        this.isLoaded = true;
      },
      error: (error) => {
        console.error('Error loading foods', error);
        this.isLoaded = true;
        this.isErrored = true;
      }
    });
  }

  public onDeleteFood(_id: number): void {
    if (confirm('Supprimer ?')) {
      this.foodService.deleteFood(_id).subscribe({
        next: () => {
          this.isLoaded = false;
          this.foodService.getFoods().subscribe({
            next: (data) => {
              console.log(data);
              this.foods = data.foods;
              this.nbFoods = data.nbFoods;
              this.foods.sort((a, b) => a.name.localeCompare(b.name));
              this.isLoaded = true;
            },
            error: (error) => {
              console.error('Error loading foods', error);
              this.isLoaded = true;
              this.isErrored = true;
            }
          });
        },
        error: (error) => {
          console.error('Error deleting food', error);
        }
      });
    }
  }
}