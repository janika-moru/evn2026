import { Link, useRouterState } from "@tanstack/react-router";
import { MessageSquareHeart } from "lucide-react";

/** Väike ujuv "Anna tagasisidet" nupp alumise menüü kohal. */
export function FeedbackFab() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/tagasiside") || path.startsWith("/admin")) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 mx-auto flex max-w-md justify-end px-4">
      <Link
        to="/tagasiside"
        search={{}}
        aria-label="Anna tagasisidet"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
      >
        <MessageSquareHeart className="size-4" /> Tagasiside
      </Link>
    </div>
  );
}
