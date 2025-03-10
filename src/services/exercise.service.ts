import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Exercise } from '../models/exercise';
import { WorkoutService } from './workout.service';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

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

  public async createExercise(programName: string, workoutIndex: number, exercise: Exercise): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'programs'));
      querySnapshot.forEach((docProgram) => {
        const dataProgram = docProgram.data();

        if (dataProgram['name'] === programName as string) {
          dataProgram['workouts'][workoutIndex].exercises.push(
            {
              name: exercise.getName(),
              type: exercise.getType(),
              goal: exercise.getGoal(),
              sets: exercise.getSets(),
              reps: exercise.getReps(),
              weight: exercise.getWeight()
            }
          );

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