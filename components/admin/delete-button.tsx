"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  entityName,
}: {
  action: () => Promise<void>;
  entityName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (
      !confirm(
        `Are you sure you want to delete this ${entityName}? This cannot be undone.`,
      )
    )
      return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950">
      <Trash2 className="mr-1 size-4" />
      {isPending ? "Deleting..." : `Delete ${entityName}`}
    </Button>
  );
}
