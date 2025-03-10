import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Program } from '../models/program';
import { Workout } from '../models/workout';
import { Exercise, ExerciseType } from '../models/exercise';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProgramService {
  constructor() { }

  public async getPrograms(): Promise<Program[]> {
    try {
      const programs: Program[] = [];

      const querySnapshot = await getDocs(collection(db, 'programs'));
      querySnapshot.forEach((docProgram) => {
        const dataProgram = docProgram.data();
        const workouts: Workout[] = [];

        dataProgram['workouts'].forEach((workout: any) => {
          const exercises: Exercise[] = [];

          workout['exercises'].forEach((exercise: any) => {
            exercises.push(
              new Exercise(
                exercise['name'],
                exercise['type'] as ExerciseType,
                exercise['goal'],
                exercise['sets'],
                exercise['reps'],
                exercise['weight']
              )
            );
          });

          workouts.push(
            new Workout(
              workout['name'],
              exercises
            )
          );
        });

        programs.push(
          new Program(
            dataProgram['name'],
            workouts
          )
        );
      });

      return programs;
    } catch (error) {
      console.error('Error getting programs:', error);
      return [];
    }
  }
}