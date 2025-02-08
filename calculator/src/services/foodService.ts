import { db } from '../../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore'

import { Food } from '@/models/food';

export async function getFoods(): Promise<Food[]> {
    try {
        const foods: Food[] = [];

        const querySnapshot = await getDocs(collection(db, 'foods'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            foods.push(new Food(data.name, data.calories, data.proteins, data.carbs, data.fats));
        });

        foods.sort((a, b) => a.getName().localeCompare(b.getName()));

        return foods;
    } catch (error) {
        console.error('Error getting food list: ', error);
        return [];
    }
}

export async function createFood(food: Food): Promise<void> {
    try {
        await addDoc(collection(db, 'foods'), {
            name: food.getName(),
            calories: food.getCalories(),
            proteins: food.getProteins(),
            carbs: food.getCarbs(),
            fats: food.getFats()
        });
    } catch (error) {
        console.error('Error creating food: ', error);
    }
}