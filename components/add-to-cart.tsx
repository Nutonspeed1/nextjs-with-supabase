"use client";

import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/components/cart-context";

export function AddToCart({ product }: { product: Omit<CartItem, "quantity"> }) {
  const { addItem } = useCart();
  const handleAdd = () => {
    addItem({ ...product, quantity: 1 });
  };
  return (
    <Button onClick={handleAdd} size="sm">
      Add to cart
    </Button>
  );
}
