import { Exercise } from "./exercise";

export class Workout {
    private name: string;
    private exercises: Exercise[];

    constructor(
        _name: string,
        _exercises: Exercise[]
    ) {
        this.name = _name;
        this.exercises = _exercises;
    }

    public getName(): string {
        return this.name;
    }

    public getExercises(): Exercise[] {
        return this.exercises;
    }
}