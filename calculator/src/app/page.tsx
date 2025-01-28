"use client";

import Link from "next/link";
import useMealStore from "@/store/mealStore";

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
    </div>
  );
};

export default HomePage;
