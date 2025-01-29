export class Food {
    barcode: string;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;

    constructor(barcode: string, name: string, calories: number, proteins: number, carbs: number, fats: number) {
        this.barcode = barcode;
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