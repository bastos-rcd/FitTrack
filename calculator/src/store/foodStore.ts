import { create } from 'zustand';
import { Food } from '@/models/food';

interface FoodStore {
    foods: Food[];
    isLoading: boolean;
    error: string | null;
    fetchFoods: (barcode: string) => Promise<void>;
}

const useFoodStore = create<FoodStore>((set) => ({
    foods: [],
    isLoading: false,
    error: null,
    fetchFoods: async (barcode: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}?product_type=food&cc=fr&lc=fr&fields=product_name%2Cnutriments`);
            const data = await response.json();

            if (data.status === 'success') {
                const product = data.product;
                const food: Food = new Food(
                    product.product_name,
                    product.nutriments['energy-kcal_value'] || 0,
                    product.nutriments['proteins_value'] || 0,
                    product.nutriments['carbohydrates_value'] || 0,
                    product.nutriments['fat_value'] || 0,
                );

                set({ foods: [food], isLoading: false });
            } else {
                set({ error: 'Product not found or invalid barcode', isLoading: false });
            }
        } catch (error) {
            set({ error: "Error while fetching data", isLoading: false });
            console.error(error);
        }
    },
}));

export default useFoodStore;