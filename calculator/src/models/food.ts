export class Food {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;

    constructor(name: string, calories: number, proteins: number, carbs: number, fats: number) {
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.carbs = carbs;
        this.fats = fats;
    }

    portion(servingSize: number) {
        return {
            totalCalories: this.calories * (servingSize / 100),
            totalProteins: this.proteins * (servingSize / 100),
            totalCarbs: this.carbs * (servingSize / 100),
            totalFats: this.fats * (servingSize / 100),
        };
    }
}