import { Component, Input } from '@angular/core';
import { Exercise, ExerciseType } from '../../../models/exercise';

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

  constructor() { }
}