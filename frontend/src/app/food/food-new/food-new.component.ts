import { Component } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public onSubmit(): void {
    if (
      this.model.name &&
      this.model.calories &&
      this.model.proteins &&
      this.model.carbs &&
      this.model.fats
    ) {
      this.route.params.subscribe((params) => {
        this.model.id = params['id'];

        this.foodService.createFood(
          new Food(
            this.model.id,
            this.model.name,
            this.model.calories,
            this.model.proteins,
            this.model.carbs,
            this.model.fats
          )
        ).subscribe({
          next: () => {
            this.router.navigate(['/foods']);
          },
          error: (error) => {
            console.error('Error creating food', error);
          }
        });
      });
    }
  }
}