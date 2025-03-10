import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../../services/workout.service';
import { Workout } from '../../../models/workout';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})

export class ExerciseListComponent {
  public program: string = '';
  public workoutIndex: number = 0;

  public workout: Workout = new Workout('', []);

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.program = params['program'];
      this.workoutIndex = params['workout'];

      this.workoutService.getWorkout(this.program, this.workoutIndex).then(workout => {
        this.workout = new Workout(workout.getName(), workout.getExercises());
      });
    });
  }
}