import { createClient } from "@/lib/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Orders</h1>
      <ul className="flex flex-col gap-4">
        {orders?.map((order) => (
          <li key={order.id} className="border p-4 rounded">
            <p className="font-semibold">Order #{order.id}</p>
            <pre className="text-xs mt-2">{JSON.stringify(order, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
