import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Workout } from '../models/workout';
import { ProgramService } from './program.service';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class WorkoutService {
  constructor(
    private programService: ProgramService
  ) { }

  public async getWorkout(programName: string, workoutIndex: number): Promise<Workout> {
    try {
      const workouts = await this.getWorkouts(programName);

      if (workouts.length > workoutIndex) {
        return workouts[workoutIndex];
      }

      return new Workout('', []);
    } catch (error) {
      console.error('Error getting workout:', error);
      return new Workout('', []);
    }
  }

  public async getWorkouts(programName: string): Promise<Workout[]> {
    try {
      const programs = await this.programService.getPrograms();
      const program = programs.find((program) => program.getName() === programName);

      if (program) {
        return program.getWorkouts();
      }

      return [];
    } catch (error) {
      console.error('Error getting workouts:', error);
      return [];
    }
  }

  public async createWorkout(programName: string, workout: Workout): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'programs'));
      querySnapshot.forEach((docProgram) => {
        const dataProgram = docProgram.data();

        if (dataProgram['name'] === programName as string) {
          dataProgram['workouts'].push({
            name: workout.getName(),
            exercises: workout.getExercises()
          });

          updateDoc(docProgram.ref, {
            name: dataProgram['name'],
            workouts: dataProgram['workouts']
          });
        }
      });
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  }
}