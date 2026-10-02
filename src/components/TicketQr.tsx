import { useEffect, useState } from "react";
import { useMyRegistrations } from "@/hooks/use-my-registrations";

function QrImage({ code }: { code: string }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    // Load the browser build of qrcode only on the client — the Node build
    // pulls in pngjs/stream and crashes the worker runtime during SSR.
    void import("qrcode/lib/browser")
      .then((m) => (m.default ?? m).toDataURL(code, { width: 512, margin: 2, errorCorrectionLevel: "M" }))
      .then((url) => { if (!cancelled) setSrc(url); })
      .catch(() => { if (!cancelled) setSrc(null); });
    return () => { cancelled = true; };
  }, [code]);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-2xl bg-card p-3">
        {src ? (
          <img src={src} alt={`QR-kood ${code}`} className="size-64 max-w-full" />
        ) : (
          <div className="size-64" />
        )}
      </div>
      <p className="font-mono text-[17px] tracking-widest">{code}</p>
    </div>
  );
}

export function TicketQr({ fientaEventId }: { fientaEventId?: string | undefined }) {
  const { codes } = useMyRegistrations();
  const list = fientaEventId ? (codes.get(fientaEventId) ?? []) : [];
  return (
    <div className="space-y-5">
      {list.length ? (
        list.map((c) => <QrImage key={c} code={c} />)
      ) : (
        <p className="text-center text-[15px] text-muted-foreground">
          Piletikood ilmub mõne hetke pärast.
        </p>
      )}
    </div>
  );
}
