import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../models/meal';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})

export class MealStoreService {
  private meal: Meal = new Meal();
  private mealSubject = new BehaviorSubject<Meal>(this.meal);

  public meal$ = this.mealSubject.asObservable();

  constructor() { }

  public getMeal(): Meal {
    return this.meal;
  }

  public addFood(_food: Food): void {
    this.meal.addFood(_food);
    this.mealSubject.next(this.meal);
  }

  public removeFood(_food: Food): void {
    this.meal.removeFood(_food);
    this.mealSubject.next(this.meal);
  }
}