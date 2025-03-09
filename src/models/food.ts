export class Food {
    private name: string;
    private calories: number;
    private proteins: number;
    private carbs: number;
    private fats: number;

    constructor(
        _name: string,
        _calories: number,
        _proteins: number,
        _carbs: number,
        _fats: number
    ) {
        this.name = _name;
        this.calories = parseFloat(_calories.toFixed(2));
        this.proteins = parseFloat(_proteins.toFixed(2));
        this.carbs = parseFloat(_carbs.toFixed(2));
        this.fats = parseFloat(_fats.toFixed(2));
    }

    private macrosCalculation(
        _value: number,
        _serving: number
    ): number {
        return parseFloat((_value * (_serving / 100)).toFixed(2));
    }

    public getName(): string {
        return this.name;
    }

    public getCalories(): number {
        return this.calories;
    }

    public getProteins(): number {
        return this.proteins;
    }

    public getCarbs(): number {
        return this.carbs;
    }

    public getFats(): number {
        return this.fats;
    }

    public getMacros(
        _size: number
    ): any {
        return {
            calories: this.macrosCalculation(this.calories, _size),
            proteins: this.macrosCalculation(this.proteins, _size),
            carbs: this.macrosCalculation(this.carbs, _size),
            fats: this.macrosCalculation(this.fats, _size)
        }
    }
}