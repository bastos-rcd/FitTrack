import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrl: './food-edit.component.css'
})

export class FoodEditComponent {
  private nameFood: string = '';
  public model: any = {};

  constructor(
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.nameFood = params['name'];

      this.foodService.getFood(this.nameFood).then((f) => {
        this.model.name = f['name'];
        this.model.calories = f['calories'];
        this.model.proteins = f['proteins'];
        this.model.carbs = f['carbs'];
        this.model.fats = f['fats'];
      });
    });
  }

  public onSubmit(): void {
    if (
      this.model.name &&
      this.model.calories &&
      this.model.proteins &&
      this.model.carbs &&
      this.model.fats
    ) {
      this.foodService.updateFood(
        this.nameFood,
        new Food(
          this.model.name,
          this.model.calories,
          this.model.proteins,
          this.model.carbs,
          this.model.fats
        )
      );

      this.router.navigate(['/calculator']);
    }
  }
}