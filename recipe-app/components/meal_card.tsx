"use client";

import { useState } from "react";
import { Meal } from "@/types/meal";
import RecipeDetailModal from "@/components/recipe_detail_modal";

interface MealCardProps {
    meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-100 object-cover"
                />
                <div className="flex flex-1 flex-col justify-between gap-2 p-4 bg-primary-green-300">
                    <div>
                        <h2 className="font-bold text-xl text-primary-green-600">{meal.strMeal}</h2>
                        <p className="text-gray-600">{meal.strCategory} · {meal.strArea}</p>
                    </div>
                    <button
                        className="mt-2 bg-primary-green-600 text-white font-bold px-4 py-2 rounded-md hover:opacity-90"
                        onClick={() => setShowModal(true)}
                    >
                        View Recipe
                    </button>
                </div>
            </div>
            {showModal && (
                <RecipeDetailModal meal={meal} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}