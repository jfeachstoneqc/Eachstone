"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateJobStatusAction } from "@/actions/jobs";

interface JobActionsProps {
  jobId: string;
  status: string;
}

export function JobActions({ jobId, status }: JobActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isCompleted = status === "completed";

  const handleMarkCompleted = () => {
    startTransition(async () => {
      await updateJobStatusAction(jobId, "completed");
      router.refresh();
    });
  };

  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        variant="default"
        disabled={isCompleted || isPending}
        onClick={handleMarkCompleted}
      >
        {isPending
          ? "Mise à jour..."
          : isCompleted
            ? "Déjà complété"
            : "Marquer comme complété"}
      </Button>
    </div>
  );
}
