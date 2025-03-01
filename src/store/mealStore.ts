import { create } from 'zustand';
import { Food } from '@/models/food';

interface MealStore {
    meal: Food[];
    addFood: (food: Food) => void;
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
    calculateTotal: () => {
        const state: MealStore = useMealStore.getState();
        const totalCalories = state.meal.reduce((sum: number, food) => sum + food.getCalories(), 0);
        const totalProteins = state.meal.reduce((sum: number, food) => sum + food.getProteins(), 0);
        const totalCarbs = state.meal.reduce((sum: number, food) => sum + food.getCarbs(), 0);
        const totalFats = state.meal.reduce((sum: number, food) => sum + food.getFats(), 0);
        return { totalCalories, totalProteins, totalCarbs, totalFats };
    }
}));

export default useMealStore;