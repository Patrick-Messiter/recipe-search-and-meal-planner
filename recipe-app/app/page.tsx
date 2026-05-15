"use client";

import { useState } from "react";
import { Meal } from "@/types/meal";
import { searchMeals } from "@/utils/search_meals";
import MealCard from "@/components/meal_card";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        try {
            const meals = await searchMeals(query);
            setResults(meals);
            if (!meals.length) setError("No recipes found.");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-col flex-1 w-3/4 py-10 px-10 bg-white sm:items-start">
            <section className="w-full">
                <h1 className="text-primary-green-600 text-4xl font-semibold">Meal Prep Made Easy</h1>
                <div className="flex justify-center">
                    <div className="w-5/6 py-10">
                        <div className="pb-5">
                            <p>Easy Meal allows you to search your favourite recipes and prepare a shopping list.</p>
                            <p>Start searching below for meals to add to your trolley.</p>
                        </div>
                        <form className="flex gap-4 w-full" onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for a recipe..."
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                            <button
                                type="submit"
                                className="bg-primary-green-400 text-white font-bold px-6 py-2 rounded-md hover:opacity-90"
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="w-full">
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {results.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((meal) => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                )}
            </section>
          </main>
        </div>
    );
}
