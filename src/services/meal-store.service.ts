import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})

export class MealStoreService {
  public meal: Meal = new Meal();

  constructor() { }
}