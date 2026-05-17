"use client";

import { useState } from "react";
import NavBar from "@/components/navbar";
import MealModal from "@/components/recipe_detail_modal";
import { Meal } from "@/types/meal";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [surpriseMeal, setSurpriseMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSurpriseMe = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await res.json();
            setSurpriseMeal(data.meals[0]);
        } catch (err) {
            console.error("Failed to fetch surprise meal", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar onSurpriseMe={handleSurpriseMe} />
            {loading && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <p className="text-white font-bold text-xl">Finding you a surprise...</p>
                </div>
            )}
            {surpriseMeal && (
                <MealModal meal={surpriseMeal} onClose={() => setSurpriseMeal(null)} />
            )}
            {children}
        </>
    );
}