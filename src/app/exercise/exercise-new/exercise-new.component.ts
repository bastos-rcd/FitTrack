import { Component } from '@angular/core';
import { Exercise, ExerciseType } from '../../../models/exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrl: './exercise-new.component.css'
})

export class ExerciseNewComponent {
  public types = Object.values(ExerciseType);
  public model: any = {};

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.model.program = params['program'];
      this.model.workout = params['workout'];
    });
  }

  public onSubmit() {
    this.exerciseService.createExercise(
      this.model.program,
      this.model.workout,
      new Exercise(
        this.model.name,
        this.model.type,
        this.model.goal,
        this.model.sets,
        this.model.reps,
        this.model.weight
      )
    ).then(() => {
      this.router.navigate(['/workout', this.model.program, this.model.workout]);
    });
  }
}