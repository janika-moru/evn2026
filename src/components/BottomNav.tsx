import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Info } from "lucide-react";

const ITEMS = [
  { to: "/minu-kava", label: "Koolitajate slaidid ja tagasiside", icon: FileText },
  { to: "/info", label: "Studio MindZ info", icon: Info },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Põhinavigatsioon"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 md:max-w-2xl lg:max-w-3xl">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to) || (to === "/minu-kava" && pathname === "/tagasiside");
          return (
            <Link
              key={to}
              to={to}
              search={{}}
              className={`flex min-h-[84px] min-w-0 flex-col items-center justify-center gap-1 px-3 py-2.5 text-center text-[13px] leading-snug font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
              <span className="max-w-[190px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
