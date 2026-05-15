"use client";

import { Meal } from "@/types/meal";

interface RecipeDetailModalProps {
    meal: Meal;
    onClose: () => void;
}

export default function RecipeDetailModal({ meal, onClose }: RecipeDetailModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-3/4 max-h-[90vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-primary-green-600">{meal.strMeal}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl font-bold">✕</button>
                </div>

                {/* Image + Meta */}
                <div className="flex gap-6 mb-6">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Category:</span> {meal.strCategory}</p>
                        <p><span className="font-semibold">Cuisine:</span> {meal.strArea}</p>
                        {meal.strSource && (
                            <a
                                href={meal.strSource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-green-600 underline hover:opacity-75"
                            >
                                View Source
                            </a>
                        )}
                        {meal.strYoutube && (
                            <a
                                href={meal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 underline hover:opacity-75"
                            >
                                Watch on YouTube
                            </a>
                        )}
                    </div>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-primary-green-600 mb-2">Ingredients</h3>
                    <ul className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 20 }, (_, i) => i + 1)
                            .filter((i) => meal[`strIngredient${i}` as keyof Meal])
                            .map((i) => (
                                <li key={i} className="text-sm text-gray-700">
                                    • {meal[`strMeasure${i}` as keyof Meal]} {meal[`strIngredient${i}` as keyof Meal]}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-primary-green-600 mb-2">Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-7">{meal.strInstructions}</p>
                </div>

                {/* Add to Trolley */}
                <button className="w-full bg-primary-green-600 text-white font-bold px-4 py-3 rounded-md hover:opacity-90">
                    Add to Trolley
                </button>
            </div>
        </div>
    );
}