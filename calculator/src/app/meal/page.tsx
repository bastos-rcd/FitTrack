"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useMealStore from "@/store/mealStore";
import { Food } from "@/models/food";
import getFoods from "@/services/foodService";

const MealPage = () => {
  const router = useRouter();
  const { addFood } = useMealStore();

  const [food, setMyFood] = useState<Food | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  const [foodName, setFoodName] = useState("");
  const [foodPortion, setFoodPortion] = useState<number | "">("");

  useEffect(() => {
    const fetchFoods = async () => {
      const foods = await getFoods();
      setFoods(foods);
      setFoodName(foods[0].getName());
    };

    fetchFoods();
  }, []);

  const onSearchFood = (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodName) return;

    const tempFood = foods.find((f) => f.getName() === foodName);
    const tempPortion = tempFood!.getPortion(Number(foodPortion));
    setMyFood(
      new Food(
        tempFood!.getName(),
        tempPortion.calories,
        tempPortion.proteins,
        tempPortion.carbs,
        tempPortion.fats
      )
    );
  };

  const onAddFood = () => {
    if (!food) return;

    addFood(food);
    router.push("/");
  };

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center p-2">
      <form
        onSubmit={onSearchFood}
        className="w-full flex flex-row justify-center items-center gap-x-2"
      >
        <div className="flex flex-col w-full gap-y-2">
          <select
            id="foods"
            onChange={(e) => setFoodName(e.target.value)}
            className="appearance-none w-full bg-white text-base p-2 rounded-xl"
            required
          >
            {foods.map((food, index) => (
              <option key={index} value={food.getName()}>
                {food.getName()}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={foodPortion}
            onChange={(e) => setFoodPortion(Number(e.target.value))}
            placeholder="Portion (g)"
            className="w-full bg-white text-base p-2 rounded-xl"
            required
          />
        </div>

        <button type="submit" className="p-2 rounded-xl bg-violet-300">
          <img src="/search.png" className="w-6" />
        </button>
      </form>

      {food && (
        <div className="w-full flex flex-col justify-between items-center mt-4 p-2 rounded-xl text-sm gap-y-2 bg-slate-300">
          <span className="text-base">{food.getName()}</span>
          <span className="text-gray-500">{food.getCalories()} kcal</span>
          <span className="text-green-500">{food.getProteins()} g</span>
          <span className="text-amber-500">{food.getCarbs()} g</span>
          <span className="text-red-500">{food.getFats()} g</span>
        </div>
      )}

      <div className="mt-4 w-full flex flex-row justify-center items-center gap-x-4">
        {food && (
          <button onClick={onAddFood} className="p-2 rounded-xl bg-green-300">
            <img src="/add.png" className="w-6" />
          </button>
        )}

        <Link href="/" className="p-2 rounded-xl bg-rose-300">
          <img src="/return.png" className="w-6" />
        </Link>
      </div>
    </div>
  );
};

export default MealPage;
