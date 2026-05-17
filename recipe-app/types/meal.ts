export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions: string;
    strYoutube: string;
    strSource: string;
    [key: string]: string;  // allows dynamic ingredient/measure keys
}