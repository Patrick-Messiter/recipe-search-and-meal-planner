"use client";

import { useEffect, useState } from "react";
import { getMergedShoppingList, getShoppingList, MergedIngredient } from "@/utils/shopping_list_storage";

export default function ShoppingListPage() {
    const [ingredients, setIngredients] = useState<MergedIngredient[]>([]);
    const [meals, setMeals] = useState<{ mealId: string; mealName: string }[]>([]);

    useEffect(() => {
        setIngredients(getMergedShoppingList());
        setMeals(getShoppingList().map(({ mealId, mealName }) => ({ mealId, mealName })));
    }, []);

    return (
        <div className="flex justify-center py-10">
            <div className="w-3/4">
                <h1 className="text-3xl font-bold text-primary-green-600 mb-8">My Shopping List</h1>

                {ingredients.length === 0 ? (
                    <p className="text-gray-500">Your shopping list is empty. Go search for some meals!</p>
                ) : (
                    <div className="flex flex-col gap-10">

                        <section>
                            <h2 className="text-xl font-bold text-primary-green-600 mb-4">Meals</h2>
                            <ul className="flex flex-col gap-2">
                                {meals.map((meal) => (
                                    <li key={meal.mealId} className="border rounded-md px-4 py-3 font-medium">
                                        {meal.mealName}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-green-600 mb-4">Ingredients</h2>
                            <ul className="grid grid-cols-2 gap-2">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="flex justify-between text-sm text-gray-700 border-b py-2">
                                        <span className="font-medium">{item.ingredient}</span>
                                        <span className="text-gray-500">{item.display}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}