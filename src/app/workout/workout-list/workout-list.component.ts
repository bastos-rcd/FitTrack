import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})

export class WorkoutListComponent {
  public programName: string = '';

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.programName = params['name'];
    });
  }
}