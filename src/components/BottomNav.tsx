import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, CalendarCheck, Info, Sun } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Täna", icon: Sun },
  { to: "/minu-kava", label: "Minu kava", icon: CalendarCheck },
  { to: "/kava", label: "Kava", icon: CalendarDays },
  { to: "/info", label: "Info", icon: Info },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Põhinavigatsioon"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
