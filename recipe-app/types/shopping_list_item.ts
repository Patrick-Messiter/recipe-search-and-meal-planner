export interface Ingredient {
    ingredient: string;
    measure: string;
}

export interface MergedIngredient {
    ingredient: string;
    measures: string[];
    display: string;
}

export interface ShoppingListItem {
    mealId: string;
    mealName: string;
    ingredients: Ingredient[];
}