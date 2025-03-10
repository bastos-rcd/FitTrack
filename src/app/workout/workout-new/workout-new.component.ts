import { Component } from '@angular/core';
import { WorkoutService } from '../../../services/workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../../../models/workout';

@Component({
  selector: 'app-workout-new',
  templateUrl: './workout-new.component.html',
  styleUrl: './workout-new.component.css'
})
export class WorkoutNewComponent {
  public model: any = {};

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.model.program = params['program'];
    });
  }

  public onSubmit() {
    this.workoutService.createWorkout(
      this.model.program,
      new Workout(
        this.model.name,
        []
      )
    ).then(() => {
      this.router.navigate(['/program', this.model.program]);
    });
  }
}