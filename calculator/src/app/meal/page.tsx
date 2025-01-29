"use client";

import useFoodStore from "@/store/foodStore";
import useMealStore from "@/store/mealStore";
import { Food } from "@/models/food";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MealPage = () => {
  const router = useRouter();

  const { addFood } = useMealStore();
  const { food, fetchFood } = useFoodStore();

  const [barcode, setBarCode] = useState<number | "">("");
  const [portion, setPortion] = useState<number | "">("");
  const [myFood, setMyFood] = useState<Food>(new Food("", "", 0, 0, 0, 0));

  const onSearchFood = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchFood(barcode.toString()).then(() => {
      setMyFood(
        new Food(
          food.barcode,
          food.name,
          food.calories,
          food.proteins,
          food.carbs,
          food.fats
        )
      );
    });
  };

  const onPortion = (e: React.FormEvent) => {
    e.preventDefault();
    const tempFoo = food.portion(Number(portion));
    setMyFood(
      new Food(
        food.barcode,
        food.name,
        tempFoo.calories,
        tempFoo.proteins,
        tempFoo.carbs,
        tempFoo.fats
      )
    );
  };

  const onAddFood = () => {
    addFood(myFood);
    router.push("/");
  };

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center p-2">
      <form
        onSubmit={onSearchFood}
        className="w-full flex flex-row justify-center items-center gap-x-2"
      >
        <input
          type="number"
          placeholder="Code barre"
          value={barcode}
          onChange={(e) =>
            setBarCode(e.target.value ? parseFloat(e.target.value) : "")
          }
          className="w-full bg-white text-sm p-2 rounded-xl"
          required
        />
        <button
          type="submit"
          className="p-1 text-center justify-center items-center rounded-xl bg-violet-300"
        >
          <img src="/search.png" className="w-8" />
        </button>
      </form>
      <form
        onSubmit={onPortion}
        className="w-full flex flex-row justify-center items-center mt-4 gap-x-2"
      >
        <input
          type="number"
          placeholder="Portion (g)"
          value={portion}
          onChange={(e) =>
            setPortion(e.target.value ? parseFloat(e.target.value) : "")
          }
          className="w-full bg-white text-sm p-2 rounded-xl"
          required
        />
        <button
          type="submit"
          className="p-1 text-center justify-center items-center rounded-xl bg-violet-300"
        >
          <img src="/search.png" className="w-8" />
        </button>
      </form>
      <div className="w-full flex flex-col justify-between items-center mt-4 p-2 rounded-xl text-sm gap-y-2 bg-slate-300">
        <span className="text-base">{myFood.name}</span>
        <span className="text-gray-500">{myFood.calories} kcal</span>
        <span className="text-green-500">{myFood.proteins} g</span>
        <span className="text-amber-500">{myFood.carbs} g</span>
        <span className="text-red-500">{myFood.fats} g</span>
      </div>
      <button
        onClick={onAddFood}
        className="mt-4 p-1 text-center justify-center items-center rounded-xl bg-green-300"
      >
        <img src="/add.png" className="w-8" />
      </button>
    </div>
  );
};

export default MealPage;
