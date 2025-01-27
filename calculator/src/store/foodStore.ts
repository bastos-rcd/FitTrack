import { create } from 'zustand';

interface Food {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

interface FoodStore {
    foods: Food[];
    isLoading: boolean;
    error: string | null;
    fetchFoods: () => Promise<void>;
}

const useFoodStore = create<FoodStore>((set) => ({
    foods: [],
    isLoading: false,
    error: null,
    fetchFoods: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('https://raw.githubusercontent.com/bastos-rcd/FitTrack/refs/heads/data/macro.json');
            const foods: Food[] = await response.json();
            set({ foods, isLoading: false });
        } catch (error) {
            set({ error: "Error while fetching data", isLoading: false });
            console.error(error);
        }
    },
}));

export default useFoodStore;