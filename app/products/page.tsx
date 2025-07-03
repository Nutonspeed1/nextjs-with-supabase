import { createClient } from "@/lib/supabase/server";
import { AddToCart } from "@/components/add-to-cart";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id,name,description,price");

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid gap-4">
        {products?.length ? (
          products.map((p) => (
            <div key={p.id} className="border rounded p-4 space-y-2">
              <h2 className="font-semibold">{p.name}</h2>
              {p.description && <p>{p.description}</p>}
              <p>${p.price}</p>
              <AddToCart product={{ id: p.id, name: p.name, price: p.price }} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
