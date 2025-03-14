export enum ExerciseType {
    TOP = 'top',
    DROP = 'drop',
    SUPER = 'super',
    NORMAL = 'normal'
}

export class Exercise {
    private name: string;
    private type: ExerciseType;
    private goal: string;
    private sets: number;
    private reps: number;
    private weight: number;

    constructor(
        _name: string,
        _type: ExerciseType,
        _goal: string,
        _sets: number,
        _reps: number,
        _weight: number
    ) {
        this.name = _name;
        this.type = _type;
        this.goal = _goal;
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

    public getGoal(): string {
        return this.goal;
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