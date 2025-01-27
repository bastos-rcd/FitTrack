import { create } from 'zustand';

interface Food {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

interface MealStore {
    meal: Food[];
    addFood: (food: Food) => void;
    removeFood: (food: Food) => void;
    calculateTotal: () => {
        totalCalories: number;
        totalProteins: number;
        totalCarbs: number;
        totalFats: number;
    };
}

const useMealStore = create<MealStore>((set) => ({
    meal: [],
    addFood: (food: Food) => set((state) => ({
        meal: [...state.meal, food],
    })),
    removeFood: (food: Food) => set((state) => ({
        meal: state.meal.filter((f) => f.name !== food.name),
    })),
    calculateTotal: () => {
        const state: MealStore = useMealStore.getState();
        const totalCalories = state.meal.reduce((sum: number, food) => sum + food.calories, 0);
        const totalProteins = state.meal.reduce((sum: number, food) => sum + food.proteins, 0);
        const totalCarbs = state.meal.reduce((sum: number, food) => sum + food.carbs, 0);
        const totalFats = state.meal.reduce((sum: number, food) => sum + food.fats, 0);
        return { totalCalories, totalProteins, totalCarbs, totalFats };
    },
}));

export default useMealStore;