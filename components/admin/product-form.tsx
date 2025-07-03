"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export function ProductForm({
  product,
}: {
  product?: { id: number; name: string; description: string; price: number };
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      await supabase
        .from("products")
        .update({ name, description, price: Number(price) })
        .eq("id", product.id);
    } else {
      await supabase.from("products").insert({ name, description, price: Number(price) });
      setName("");
      setDescription("");
      setPrice("");
    }
    router.refresh();
  };

  const handleDelete = async () => {
    if (!product) return;
    await supabase.from("products").delete().eq("id", product.id);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          {product ? "Update" : "Create"}
        </Button>
        {product && (
          <Button type="button" variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
