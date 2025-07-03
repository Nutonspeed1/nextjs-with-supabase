"use client";

import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // Placeholder: connect to payment service here
    alert("Redirecting to payment...");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × ${item.price}
                </p>
              </div>
              <Button variant="ghost" onClick={() => removeItem(item.id)} size="sm">
                Remove
              </Button>
            </div>
          ))}
          <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          <div className="flex gap-2">
            <Button onClick={handleCheckout}>Checkout</Button>
            <Button variant="secondary" onClick={clear} type="button">
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
