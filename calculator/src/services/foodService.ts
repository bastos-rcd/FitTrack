import { db } from '../../firebaseConfig';
import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'

import { Food } from '@/models/food';

export async function getFoodByName(foodName: string): Promise<Food> {
    let food: Food = new Food("", 0, 0, 0, 0);

    try {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name === foodName) {
                food = new Food(data.name, data.calories, data.proteins, data.carbs, data.fats);
            }
        });
    } catch (error) {
        console.error('Error getting food by name: ', error);
    }

    return food;
}

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

export async function deleteFood(foodName: string): Promise<void> {
    try {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name === foodName) {
                deleteDoc(doc.ref);
            }
        });
    } catch (error) {
        console.error('Error deleting food: ', error);
    }
}