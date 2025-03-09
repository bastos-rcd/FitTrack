import { Injectable } from '@angular/core';
import { db } from './firebase-config';
import { Food } from '../models/food';
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  constructor() { }

  public async getFood(name: string): Promise<Food> {
    let food: Food = new Food('', 0, 0, 0, 0);

    try {
      const querySnapshot = await getDocs(collection(db, 'foods'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['name'] === name) {
          food = new Food(
            data['name'],
            data['calories'],
            data['proteins'],
            data['carbs'],
            data['fats']
          );
        }
      });
    } catch (error) {
      console.error('Error getting food:', error);
    }

    return food;
  }

  public async getFoods(): Promise<Food[]> {
    try {
      const foods: Food[] = [];

      const querySnapshot = await getDocs(collection(db, 'foods'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        foods.push(
          new Food(
            data['name'],
            data['calories'],
            data['proteins'],
            data['carbs'],
            data['fats']
          )
        )
      });

      return foods;
    } catch (error) {
      console.error('Error getting foods:', error);
      return [];
    }
  }

  public async createFood(food: Food): Promise<void> {
    try {
      await addDoc(collection(db, 'foods'), {
        name: food.getName(),
        calories: food.getCalories(),
        proteins: food.getProteins(),
        carbs: food.getCarbs(),
        fats: food.getFats()
      })
    } catch (error) {
      console.error('Error creating food:', error);
    }
  }

  public async updateFood(previousName: string, food: Food): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'foods'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['name'] === previousName) {
          updateDoc(doc.ref, {
            name: food.getName(),
            calories: food.getCalories(),
            proteins: food.getProteins(),
            carbs: food.getCarbs(),
            fats: food.getFats()
          });
        }
      });
    } catch (error) {
      console.error('Error updating food:', error);
    }
  }

  public async deleteFood(name: string): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, 'foods'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data['name'] === name) {
          deleteDoc(doc.ref);
        }
      });
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  }
}