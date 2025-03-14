import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../../services/workout.service';
import { Workout } from '../../../models/workout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})

export class WorkoutListComponent {
  public program: string = '';
  public workouts: Workout[] = [];

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.program = params['program'];

      this.workoutService.getWorkouts(this.program).then((workouts) => {
        this.workouts = workouts;
      });
    });
  }
}