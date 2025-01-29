"use client";

import Link from "next/link";
import useMealStore from "@/store/mealStore";
import { Food } from "@/models/food";
import { useState } from "react";

const HomePage = () => {
  const { meal, calculateTotal } = useMealStore();

  const { totalCalories, totalProteins, totalCarbs, totalFats } =
    calculateTotal();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
          <div className="w-full md:w-1/4 flex flex-col justify-center items-center p-6 rounded-xl gap-y-2 bg-white">
            <p className="text-gray-500">
              Calories : {parseFloat(Number(totalCalories).toFixed(2))} kcal
            </p>
            <p className="text-green-500">
              Protéines : {parseFloat(Number(totalProteins).toFixed(2))} g
            </p>
            <p className="text-amber-500">
              Glucides : {parseFloat(Number(totalCarbs).toFixed(2))} g
            </p>
            <p className="text-red-500">
              Lipides : {parseFloat(Number(totalFats).toFixed(2))} g
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 p-2 bg-rose-500 text-white rounded-xl"
            >
              FERMER
            </button>
          </div>
        </div>
      )}

      <p className="text-xl font-bold p-2">{totalCalories} kcal</p>
      <div className="w-full flex flex-row justify-between p-2 text-sm">
        <p className="text-green-500 font-bold">
          P : {parseFloat(Number(totalProteins).toFixed(2))} g
        </p>
        <p className="text-amber-500 font-bold">
          C : {parseFloat(Number(totalCarbs).toFixed(2))} g
        </p>
        <p className="text-red-500 font-bold">
          F : {parseFloat(Number(totalFats).toFixed(2))} g
        </p>
      </div>
      <div className="w-full flex flex-row justify-evenly p-2 text-sm text-white">
        <button
          onClick={() => setIsOpen(true)}
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
              <p className="text-green-500">
                {parseFloat(Number(food.proteins).toFixed(2))} g
              </p>
              <p className="text-amber-500">
                {parseFloat(Number(food.carbs).toFixed(2))} g
              </p>
              <p className="text-red-500">
                {parseFloat(Number(food.fats).toFixed(2))} g
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
