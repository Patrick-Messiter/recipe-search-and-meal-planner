import { CartItem } from "@/types.cart_item";

export function getCart(): CartItem[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const exists = cart.find((i) => i.id === item.id);
  if (!exists) {
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  }
}