import { notFound } from "next/navigation";
import { getFoodByName, getFoods } from "@/services/foodService";
import EditClient from "./Edit";

export async function generateStaticParams() {
  const foods = await getFoods();
  return foods.map((food) => ({
    food: encodeURIComponent(food.getName()),
  }));
}

const EditFoodPage = async ({ params }: { params?: { food?: string } }) => {
  if (!params?.food) return notFound();

  const foodName = decodeURIComponent(params.food);
  const food = await getFoodByName(foodName);

  if (!food) return notFound();

  return (
    <EditClient
      food={{
        name: food.getName(),
        calories: food.getCalories(),
        proteins: food.getProteins(),
        carbs: food.getCarbs(),
        fats: food.getFats(),
      }}
    />
  );
};

export default EditFoodPage;
