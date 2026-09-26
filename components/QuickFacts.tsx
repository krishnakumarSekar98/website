import { quickFacts } from '@/config/site';

/** A strip of facts a visitor can verify by walking in — deliberately not
 *  member counts or years-in-business, which nobody can check and which
 *  read as invented. */
export default function QuickFacts() {
  return (
    <section className="relative border-y border-line bg-panel">
      <div className="container-x grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {quickFacts.map((f) => (
          <div
            key={f.label}
            className="flex flex-col items-center text-center lg:border-r lg:border-line lg:last:border-none"
          >
            <span className="gold-text font-display text-4xl leading-none sm:text-5xl">
              {f.value}
            </span>
            <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
