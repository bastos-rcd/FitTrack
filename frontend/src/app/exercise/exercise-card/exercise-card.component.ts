import { Component, Input } from '@angular/core';
import { Exercise, ExerciseType } from '../../../models/exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.css'
})

export class ExerciseCardComponent {
  @Input() public program: string = '';
  @Input() public workout: number = 0;
  @Input() public exerciseIndex: number = 0;

  @Input() public exercise: Exercise = new Exercise('', ExerciseType.NORMAL, '', 0, 0, 0);

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  public onDelete(): void {
    if (confirm('Supprimer ' + this.exercise.getName() + ' ?')) {
      this.exerciseService.deleteExercise(this.program, this.workout, this.exerciseIndex).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}