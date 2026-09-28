import { Link } from "@tanstack/react-router";
import { Clock, CheckCircle2 } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { statusLabel } from "@/lib/events";

export function StatusBadge({ status }: { status: EventItem["registrationStatus"] }) {
  if (status === "registered") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
        <CheckCircle2 className="size-3.5" />
        {statusLabel(status)}
      </span>
    );
  }
  if (status === "full" || status === "closed") {
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        {statusLabel(status)}
      </span>
    );
  }
  return null;
}

export function EventCard({ event }: { event: EventItem }) {
  const registered = event.registrationStatus === "registered";

  return (
    <Link
      to="/sundmus/$id"
      params={{ id: event.id }}
      className={`block rounded-2xl border p-4 transition-colors active:bg-secondary/60 ${
        registered ? "border-primary/40 bg-secondary/40" : "border-border bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Clock className="size-4 shrink-0" />
            {event.startTime}–{event.endTime}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug">{event.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{event.speaker}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {event.shortDescription}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <StatusBadge status={event.registrationStatus} />
        {event.registrationStatus === "open" && (
          <span className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Registreeru
          </span>
        )}
      </div>
    </Link>
  );
}
