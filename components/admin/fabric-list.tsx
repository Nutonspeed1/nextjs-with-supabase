"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export type Fabric = { id: number; name: string; sort_order: number };

function FabricItem({ fabric }: { fabric: Fabric }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: fabric.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="border rounded p-2 bg-background"
      {...attributes}
      {...listeners}
    >
      {fabric.name}
    </li>
  );
}

export function FabricList({ fabrics }: { fabrics: Fabric[] }) {
  const [items, setItems] = useState(fabrics);
  const router = useRouter();
  const supabase = createClient();

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
    const newOrder = arrayMove(
      items,
      items.findIndex((i) => i.id === active.id),
      items.findIndex((i) => i.id === over.id),
    );
    const updates = newOrder.map((fabric, index) => ({
      id: fabric.id,
      sort_order: index,
    }));
    const { error } = await supabase.from("fabrics").upsert(updates);
    if (error) console.error(error);
    router.refresh();
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {items.map((fabric) => (
            <FabricItem key={fabric.id} fabric={fabric} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
