import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase.from("products").select("*").order("id");
  if (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Products</h1>
      <ProductForm />
      <ul className="flex flex-col gap-4">
        {products?.map((product) => (
          <li key={product.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm">${product.price}</p>
              </div>
              <ProductForm product={product} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
