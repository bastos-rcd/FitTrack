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
      const programsSnapshot = await getDocs(collection(db, 'programs'));

      for (const programDoc of programsSnapshot.docs) {
        const programData = programDoc.data();

        const workouts: Workout[] = [];
        const workoutsSnapshot = await getDocs(collection(programDoc.ref, 'workouts'));

        for (const workoutDoc of workoutsSnapshot.docs) {
          const workoutData = workoutDoc.data();

          const exercises: Exercise[] = [];
          const exercisesSnapshot = await getDocs(collection(workoutDoc.ref, 'exercises'));

          for (const exerciseDoc of exercisesSnapshot.docs) {
            const exerciseData = exerciseDoc.data();

            exercises.push(new Exercise(
              exerciseData['name'],
              exerciseData['type'],
              exerciseData['sets'],
              exerciseData['reps'],
              exerciseData['weight']
            ));
          }

          workouts.push(new Workout(
            workoutData['name'],
            exercises
          ));
        }

        programs.push(new Program(
          programData['name'],
          workouts
        ));
      }

      return programs;
    } catch (error) {
      console.error('Error getting programs:', error);
      return [];
    }
  }
}