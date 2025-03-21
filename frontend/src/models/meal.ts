import { Food } from "./food";

export class Meal {
    private foods: Food[];

    constructor() {
        this.foods = [];
    }

    public addFood(
        _food: Food
    ): void {
        this.foods.push(_food);
    }

    public removeFood(
        _food: Food
    ): void {
        this.foods = this.foods.filter(food => food !== _food);
    }

    public getFoods(): Food[] {
        return this.foods;
    }

    public getMacros(): any {
        return {
            totalCalories: this.foods.reduce((sum: number, food) => sum + food.calories, 0),
            totalProteins: this.foods.reduce((sum: number, food) => sum + food.proteins, 0),
            totalCarbs: this.foods.reduce((sum: number, food) => sum + food.carbs, 0),
            totalFats: this.foods.reduce((sum: number, food) => sum + food.fats, 0)
        }
    }
}