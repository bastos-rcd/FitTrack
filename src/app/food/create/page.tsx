"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Food } from "@/models/food";
import { createFood } from "@/services/foodService";

const CreateFoodPage = () => {
  const router = useRouter();

  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState<number | string>("");
  const [foodProteins, setFoodProteins] = useState<number | string>("");
  const [foodCarbs, setFoodCarbs] = useState<number | string>("");
  const [foodFats, setFoodFats] = useState<number | string>("");

  const onCreateFood = async (e: React.FormEvent) => {
    e.preventDefault();
    createFood(
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
        onSubmit={onCreateFood}
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
            <img src="/add.png" className="w-6" />
          </button>
          <Link href="/food" className="p-2 rounded-xl bg-rose-300">
            <img src="/return.png" className="w-6" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateFoodPage;
