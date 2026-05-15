"use client";

import { useState } from "react";
import { Meal } from "@/types/meal";
import { searchMeals } from "@/utils/search_meals";

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
          <main className="flex flex-1 w-3/4 py-10 px-10 bg-white sm:items-start">
            <section className="w-full">
                <h1 className="text-primary-green-600 text-4xl font-semibold">Meal Prep Made Easy</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-5/6">
                        <div className="py-10">
                            <p>
                                Easy Meal allows you to search up your favourite recipes and plan out a shopping list of all the ingredients required for the meals you add to your trolley.
                            </p>
                            <p>Start searching below for meals to add to your trolley.</p>
                        </div>
                        <form className="flex gap-4 w-full">
                            <input
                                type="text"
                                placeholder="Search for a recipe..."
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                            <button
                                type="submit"
                                className="bg-primary-green-400 text-white font-bold px-6 py-2 rounded-md hover:opacity-90"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </section>
          </main>
        </div>
    );
}
