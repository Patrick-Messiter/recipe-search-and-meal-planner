import { ShoppingListItem } from "@/types.shopping_list_item";

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