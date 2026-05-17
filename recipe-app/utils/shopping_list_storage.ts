import { ShoppingListItem, MergedIngredient } from "@/types.shopping_list_item";
import { standardiseMeasures } from "@/utils/standardise_units";

export function getShoppingList(): ShoppingListItem[] {
    const list = localStorage.getItem("shoppingList");
    return list ? JSON.parse(list) : [];
}

export function addToShoppingList(item: ShoppingListItem): void {
    const list = getShoppingList();
    const exists = list.find((i) => i.mealId === item.mealId);
    if (!exists) {
        localStorage.setItem("shoppingList", JSON.stringify([...list, item]));
    }
}

export function getMergedShoppingList(): MergedIngredient[] {
    const list = getShoppingList();

    const merged: Record<string, string[]> = {};

    list.forEach((meal) => {
        meal.ingredients.forEach(({ ingredient, measure }) => {
            const key = ingredient.toLowerCase().trim();
            if (!merged[key]) {
                merged[key] = [];
            }
            if (measure.trim()) {
                merged[key].push(measure.trim());
            }
        });
    });

    return Object.entries(merged)
        .map(([key, measures]) => ({
            ingredient: key.charAt(0).toUpperCase() + key.slice(1),
            measures,
            display: standardiseMeasures(measures, key),
        }))
        .sort((a, b) => a.ingredient.localeCompare(b.ingredient));
}