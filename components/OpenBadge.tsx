'use client';

import { useEffect, useState } from 'react';
import { getOpenState, type OpenState } from '@/lib/hours';

/** Live OPEN NOW / CLOSED badge computed in Asia/Kolkata.
 *  Renders after mount to avoid a server/client time mismatch. */
export default function OpenBadge({ className = '' }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return <span className={`inline-block h-8 w-36 rounded-full bg-panel ${className}`} aria-hidden />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
        state.open
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
          : 'border-red-500/40 bg-red-500/10 text-red-300'
      } ${className}`}
      role="status"
    >
      <span className="relative flex h-2.5 w-2.5">
        {state.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            state.open ? 'bg-emerald-400' : 'bg-red-400'
          }`}
        />
      </span>
      {state.open ? 'Open Now' : 'Closed'}
      <span className="font-normal normal-case tracking-normal text-muted">· {state.message}</span>
    </span>
  );
}
