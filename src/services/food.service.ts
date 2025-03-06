import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  constructor() { }

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
}