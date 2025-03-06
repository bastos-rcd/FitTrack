export enum ExerciseType {
    TOPSET = 'top-set',
    DROPTSET = 'drop-set'
}

export class Exercise {
    private name: string;
    private type: ExerciseType;
    private sets: number;
    private reps: number;
    private weight: number;

    constructor(_name: string, _type: ExerciseType, _sets: number, _reps: number, _weight: number) {
        this.name = _name;
        this.type = _type;
        this.sets = _sets;
        this.reps = _reps;
        this.weight = _weight;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): ExerciseType {
        return this.type;
    }

    public getSets(): number {
        return this.sets;
    }

    public getReps(): number {
        return this.reps;
    }

    public getWeight(): number {
        return this.weight;
    }
}