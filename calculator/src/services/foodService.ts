import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

import { Food } from '@/models/food';

export default async function getFoodList() {
    try {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        const foods: Food[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            foods.push(new Food(doc.id, data.name, data.calories, data.proteins, data.carbs, data.fats));
        });

        console.log(foods);
    } catch (error) {

    }
}