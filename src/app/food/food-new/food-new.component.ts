import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Router } from '@angular/router';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-food-new',
  templateUrl: './food-new.component.html',
  styleUrl: './food-new.component.css'
})

export class FoodNewComponent {
  public model: any = {};

  constructor(
    private foodService: FoodService,
    private router: Router
  ) { }

  public onSubmit(): void {
    if (
      this.model.name &&
      this.model.calories &&
      this.model.proteins &&
      this.model.carbs &&
      this.model.fats
    ) {
      this.foodService.createFood(
        new Food(
          this.model.name,
          this.model.calories,
          this.model.proteins,
          this.model.carbs,
          this.model.fats
        )
      );

      this.router.navigate(['/foods']);
    }
  }
}