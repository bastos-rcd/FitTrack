import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Program } from '../models/program';
import { Workout } from '../models/workout';
import { Exercise, ExerciseType } from '../models/exercise';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

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

  public async createProgram(program: Program): Promise<void> {
    try {
      await addDoc(collection(db, 'programs'), {
        name: program.getName(),
        workouts: program.getWorkouts().map((workout) => {
          return {
            name: workout.getName(),
            exercises: workout.getExercises().map((exercise) => {
              return {
                name: exercise.getName(),
                type: exercise.getType(),
                goal: exercise.getGoal(),
                sets: exercise.getSets(),
                reps: exercise.getReps(),
                weight: exercise.getWeight()
              }
            })
          }
        })
      });
    } catch (error) {
      console.error('Error creating program:', error);
    }
  }

  public async deleteProgram(program: Program): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'programs'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['name'] === program.getName()) {
          deleteDoc(doc.ref);
        }
      });
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  }
}