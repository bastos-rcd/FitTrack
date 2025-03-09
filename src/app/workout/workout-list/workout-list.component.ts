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
  public programName: string = '';
  public workouts: Workout[] = [];

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.programName = params['name'];

      this.workoutService.getWorkouts(this.programName).then((workouts) => {
        this.workouts = workouts;
      });
    });
  }
}