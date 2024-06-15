"use client";

import { CircleArrowOutDownRight, RefreshCcwIcon } from "lucide-react";
import { Button } from "./ui/button";
import { updateTeam } from "@/functions/team";
import { uid } from "uid";
import { useRouter } from "next/navigation";

function GenerateNew({ teamId }: { teamId: string }) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        await updateTeam({ invitation: uid(16) }, teamId);
        router.refresh();
      }}
    >
      <Button type="submit">
        <RefreshCcwIcon />
      </Button>
    </form>
  );
}

export default GenerateNew;
