export interface ShoppingListItem {
    mealId: string;
    mealName: string;
    ingredients: { ingredient: string; measure: string }[];
}