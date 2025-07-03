import { createClient } from "@/lib/supabase/server";
import { FabricItem } from "@/components/FabricItem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CollectionPage({ params }: any) {
  const supabase = await createClient();
  const { data: collection } = await supabase
    .from("collections")
    .select("id,name")
    .eq("id", params.id)
    .single();
  const { data: fabrics } = await supabase
    .from("fabrics")
    .select("id,image_url,is_cover")
    .eq("collection_id", params.id)
    .order("id");

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{collection?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fabrics?.map((fabric) => (
          <FabricItem key={fabric.id} fabric={fabric} collectionId={Number(params.id)} />
        ))}
      </div>
    </div>
  );
}
