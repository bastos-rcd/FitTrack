export class Food {
    private name: string;
    private calories: number;
    private proteins: number;
    private carbs: number;
    private fats: number;

    constructor(name: string, calories: number, proteins: number, carbs: number, fats: number) {
        this.name = name;
        this.calories = parseFloat(calories.toFixed(2));
        this.proteins = parseFloat(proteins.toFixed(2));
        this.carbs = parseFloat(carbs.toFixed(2));
        this.fats = parseFloat(fats.toFixed(2));
    }

    private calculateMacros(value: number, serving: number) {
        return parseFloat((value * (serving / 100)).toFixed(2));
    }

    public getName() {
        return this.name;
    }

    public getCalories() {
        return this.calories;
    }

    public getProteins() {
        return this.proteins;
    }

    public getCarbs() {
        return this.carbs;
    }

    public getFats() {
        return this.fats;
    }

    public getPortion(servingSize: number) {
        return {
            calories: this.calculateMacros(this.calories, servingSize),
            proteins: this.calculateMacros(this.proteins, servingSize),
            carbs: this.calculateMacros(this.carbs, servingSize),
            fats: this.calculateMacros(this.fats, servingSize)
        };
    }
}