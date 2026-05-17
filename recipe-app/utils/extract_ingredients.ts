import { Meal } from "@/types/meal";

export function extractIngredients(meal: Meal): { ingredient: string; measure: string }[] {
    return Array.from({ length: 20 }, (_, i) => i + 1)
        .filter((i) => meal[`strIngredient${i}`]?.trim())
        .map((i) => ({
            ingredient: meal[`strIngredient${i}`],
            measure: meal[`strMeasure${i}`] || "",
        }));
}