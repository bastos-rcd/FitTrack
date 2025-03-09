import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Workout } from '../models/workout';
import { ProgramService } from './program.service';

@Injectable({
  providedIn: 'root'
})

export class WorkoutService {
  constructor(
    private programService: ProgramService
  ) { }

  public async getWorkouts(programName: string): Promise<Workout[]> {
    try {
      const workouts: Workout[] = [];

      this.programService.getPrograms().then((programs) => {
        const program = programs.find((program) => program.getName() === programName);

        if (program) {
          workouts.push(...program.getWorkouts());
        }
      });

      return workouts;
    } catch (error) {
      console.error('Error getting workouts:', error);
      return [];
    }
  }
}