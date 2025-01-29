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
            calories: parseFloat((this.calories * (servingSize / 100)).toFixed(2)),
            proteins: parseFloat((this.proteins * (servingSize / 100)).toFixed(2)),
            carbs: parseFloat((this.carbs * (servingSize / 100)).toFixed(2)),
            fats: parseFloat((this.fats * (servingSize / 100)).toFixed(2))
        };
    }
}