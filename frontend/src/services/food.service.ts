import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  private apiUrl = 'https://fit-track-api-production.up.railway.app/api/foods';

  constructor(
    private http: HttpClient
  ) { }

  public getFood(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  public getFoods(): Observable<{
    nbFoods: number,
    foods: Food[]
  }> {
    return this.http.get<{
      nbFoods: number,
      foods: Food[]
    }>(this.apiUrl);
  }

  public createFood(food: Food): Observable<any> {
    return this.http.post<any>(this.apiUrl, food);
  }

  public deleteFood(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}