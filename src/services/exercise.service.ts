import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})

export class ExerciseService {
  constructor(
    private workoutService: WorkoutService
  ) { }

  public async getExercises(programName: string, workoutName: string): Promise<Exercise[]> {
    try {
      const exercises: Exercise[] = [];

      this.workoutService.getWorkouts(programName).then((workouts) => {
        const workout = workouts.find((workout) => workout.getName() === workoutName);

        if (workout) {
          exercises.push(...workout.getExercises());
        }
      }
      );

      return exercises;
    } catch (error) {
      console.error('Error getting exercises:', error);
      return [];
    }
  }
}