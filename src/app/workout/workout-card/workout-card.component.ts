import { Component, Input } from '@angular/core';
import { Workout } from '../../../models/workout';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})

export class WorkoutCardComponent {
  @Input() public programName!: string;
  @Input() public workout!: Workout;

  constructor() { }
}