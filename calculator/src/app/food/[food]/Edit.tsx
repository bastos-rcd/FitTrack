"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Food } from "@/models/food";
import { updateFood } from "@/services/foodService";

type FoodProps = {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
};

const EditClient = ({ food }: { food: FoodProps }) => {
  const router = useRouter();
  const [selectedFood, setSelectedFood] = useState<FoodProps>(food);

  useEffect(() => {
    setSelectedFood(food);
  }, [food]);

  const [foodName, setFoodName] = useState(selectedFood.name);
  const [foodCalories, setFoodCalories] = useState<number>(
    selectedFood.calories
  );
  const [foodProteins, setFoodProteins] = useState<number>(
    selectedFood.proteins
  );
  const [foodCarbs, setFoodCarbs] = useState<number>(selectedFood.carbs);
  const [foodFats, setFoodFats] = useState<number>(selectedFood.fats);

  const onEditFood = async (e: React.FormEvent) => {
    e.preventDefault();
    updateFood(
      food.name,
      new Food(
        foodName,
        Number(foodCalories),
        Number(foodProteins),
        Number(foodCarbs),
        Number(foodFats)
      )
    );
    router.push("/food");
  };

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col justify-center items-center p-2">
      <form
        onSubmit={onEditFood}
        className="w-full flex flex-col justify-center items-center gap-y-4"
      >
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Nom de l'aliment"
          className="w-full bg-white text-base p-2 rounded-xl"
          required
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={foodCalories}
          onChange={(e) => setFoodCalories(Number(e.target.value))}
          placeholder="Calories (kcal)"
          className="w-full bg-white text-base p-2 rounded-xl"
          required
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={foodProteins}
          onChange={(e) => setFoodProteins(Number(e.target.value))}
          placeholder="Protéines (g)"
          className="w-full bg-white text-base p-2 rounded-xl"
          required
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={foodCarbs}
          onChange={(e) => setFoodCarbs(Number(e.target.value))}
          placeholder="Glucides (g)"
          className="w-full bg-white text-base p-2 rounded-xl"
          required
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={foodFats}
          onChange={(e) => setFoodFats(Number(e.target.value))}
          placeholder="Lipides (g)"
          className="w-full bg-white text-base p-2 rounded-xl"
          required
        />

        <div className="w-full flex flex-row justify-center items-center gap-x-4">
          <button type="submit" className="p-2 rounded-xl bg-green-300">
            <img src="/edit.png" className="w-6" />
          </button>
          <Link href="/food" className="p-2 rounded-xl bg-rose-300">
            <img src="/return.png" className="w-6" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
