import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})

export class ExerciseListComponent {
  public programName: string = '';
  public workoutName: string = '';

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.programName = params['programName'];
      this.workoutName = params['workoutName'];
    });
  }
}