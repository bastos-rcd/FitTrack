"use client";

import Link from "next/link";
import useFoodStore from "@/store/foodStore";
import useMealStore from "@/store/mealStore";
import { Food } from "@/models/food";
import { useState } from "react";

const MealPage = () => {
  const { addFood } = useMealStore();
  const { food, fetchFood } = useFoodStore();

  const [barcode, setBarCode] = useState<number | "">("");

  const onSearchFood = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchFood(barcode.toString());
  };

  return (
    <div className="w-full md:w-1/4 h-full flex flex-col items-center">
      <form
        onSubmit={onSearchFood}
        className="w-full flex flex-row justify-center items-center p-2 gap-x-2"
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
    </div>
  );
};

export default MealPage;
