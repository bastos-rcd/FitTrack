"use client";

import Link from "next/link";
import useMealStore from "@/store/mealStore";
import { Food } from "@/models/food";

const HomePage = () => {
  const { meal, calculateTotal } = useMealStore();

  const { totalCalories, totalProteins, totalCarbs, totalFats } =
    calculateTotal();

  const onExportMacros = () => {};

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center">
      <p className="text-xl font-bold p-2">{totalCalories} kcal</p>
      <div className="w-full flex flex-row justify-between p-2 text-sm">
        <p className="text-green-500 font-bold">P : {totalProteins} g</p>
        <p className="text-amber-500 font-bold">C : {totalCarbs} g</p>
        <p className="text-red-500 font-bold">F : {totalFats} g</p>
      </div>
      <div className="w-full flex flex-row justify-evenly p-2 text-sm text-white">
        <button
          onClick={onExportMacros}
          className="p-1 text-center justify-center items-center rounded-xl bg-violet-300"
        >
          <img src="/export.png" className="w-8" />
        </button>
        <Link
          href="/meal"
          className="p-1 text-center justify-center items-center rounded-xl bg-violet-300"
        >
          <img src="/add.png" className="w-8" />
        </Link>
      </div>
      <div
        className="w-full max-h-full overflow-y-scroll  flex flex-col items-center p-2 gap-y-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {meal.map((food: Food) => (
          <div
            key={food.barcode}
            className="w-full flex flex-col justify-center items-center p-2 rounded-xl gap-y-2 bg-slate-300"
          >
            <p className="w- text-center font-bold">{food.name}</p>
            <p>{food.calories} kcal</p>
            <div className="w-full flex flex-row justify-around">
              <p className="text-green-500">{food.proteins} g</p>
              <p className="text-amber-500">{food.carbs} g</p>
              <p className="text-red-500">{food.fats} g</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
