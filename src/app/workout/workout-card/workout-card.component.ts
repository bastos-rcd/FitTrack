import { Component, Input } from '@angular/core';
import { Workout } from '../../../models/workout';
import { WorkoutService } from '../../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})

export class WorkoutCardComponent {
  @Input() public program!: string;
  @Input() public workoutIndex!: number;
  @Input() public workout!: Workout;

  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) { }

  public onDelete(): void {
    if (confirm('Supprimer ' + this.workout.getName() + ' ?')) {
      this.workoutService.deleteWorkout(this.program, this.workout).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}