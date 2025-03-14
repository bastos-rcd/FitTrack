import { Workout } from "./workout";

export class Program {
    private name: string;
    private workouts: Workout[];

    constructor(
        _name: string,
        _workouts: Workout[]
    ) {
        this.name = _name;
        this.workouts = _workouts;
    }

    public getName(): string {
        return this.name;
    }

    public getWorkouts(): Workout[] {
        return this.workouts;
    }
}