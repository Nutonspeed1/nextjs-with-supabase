"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface Fabric {
  id: number;
  image_url: string;
  is_cover: boolean;
}

export function FabricItem({ fabric, collectionId }: { fabric: Fabric; collectionId: number }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const setCover = async () => {
    setLoading(true);
    await supabase
      .from("fabrics")
      .update({ is_cover: false })
      .eq("collection_id", collectionId);
    await supabase
      .from("fabrics")
      .update({ is_cover: true })
      .eq("id", fabric.id);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Image src={fabric.image_url} alt="fabric" width={200} height={200} className="rounded" />
      <Button onClick={setCover} size="sm" variant={fabric.is_cover ? "secondary" : "default"} disabled={loading}>
        {fabric.is_cover ? "Cover" : "Set as cover"}
      </Button>
    </div>
  );
}
