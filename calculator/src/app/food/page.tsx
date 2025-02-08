"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Food } from "@/models/food";
import { getFoods } from "@/services/foodService";

const FoodPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const foods = await getFoods();
      setFoods(foods);
    };

    fetchFoods();
  });

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center">
      <div className="w-full flex flex-row justify-evenly p-2 text-sm text-white">
        <Link href="/food/create" className="p-2 rounded-xl bg-violet-300">
          <img src="/add.png" className="w-6" />
        </Link>
        <Link href="/" className="p-2 rounded-xl bg-violet-300">
          <img src="/return.png" className="w-6" />
        </Link>
      </div>
      <div
        className="mt-4 w-full max-h-full overflow-y-scroll flex flex-col items-center p-2 gap-y-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {foods.map((food: Food) => (
          <div
            key={food.getName()}
            className="w-full flex flex-col justify-center items-center p-2 rounded-xl gap-y-2 bg-slate-300"
          >
            <div className="w-full flex flex-row items-center gap-x-2">
              <p className="w-full text-center font-bold">{food.getName()}</p>
              <Link
                href={`/food/${food.getName()}`}
                className="p-2 rounded-xl bg-green-300"
              >
                <img src="/edit.png" className="w-8" />
              </Link>
              <Link href="#" className="p-2 rounded-xl bg-rose-300">
                <img src="/delete.png" className="w-8" />
              </Link>
            </div>
            <p>{food.getCalories()} kcal</p>
            <div className="w-full flex flex-row justify-around">
              <p className="text-green-500">{food.getProteins()} g</p>
              <p className="text-amber-500">{food.getCarbs()} g</p>
              <p className="text-red-500">{food.getFats()} g</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
