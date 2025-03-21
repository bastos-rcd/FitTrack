export class Food {
    constructor(
        public id: number,
        public name: string,
        public calories: number,
        public proteins: number,
        public carbs: number,
        public fats: number
    ) { }

    private macrosCalculation(
        _value: number,
        _serving: number
    ): number {
        return parseFloat((_value * (_serving / 100)).toFixed(2));
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