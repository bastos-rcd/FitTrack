import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

import { Food } from '@/models/food';

export default async function getFoods(): Promise<Food[]> {
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