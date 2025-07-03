import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function CollectionsPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from("collections")
    .select("id,name,fabrics(image_url,is_cover)");

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Collections</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections?.map((collection) => {
          const cover = collection.fabrics?.find((f) => f.is_cover);
          return (
            <li key={collection.id} className="border p-4 rounded">
              {cover && (
                <Image
                  src={cover.image_url}
                  alt={collection.name}
                  width={300}
                  height={200}
                  className="mb-2 rounded"
                />
              )}
              <Link href={`/collections/${collection.id}`} className="font-semibold">
                {collection.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
