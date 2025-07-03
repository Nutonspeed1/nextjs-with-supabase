import { createClient } from "@/lib/supabase/server";
import { FabricList } from "@/components/admin/fabric-list";

export default async function FabricsPage() {
  const supabase = await createClient();
  const { data: fabrics, error } = await supabase
    .from("fabrics")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Fabrics</h1>
      {fabrics && <FabricList fabrics={fabrics} />}
    </div>
  );
}
