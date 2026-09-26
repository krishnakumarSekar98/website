import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { hours, navLinks, site } from '@/config/site';
import { formatRange } from '@/lib/hours';

export default function Footer() {
  const year = new Date().getFullYear();

  // Only profiles with a URL are rendered — add more in /config/site.ts (socials).
  const socials = [
    { icon: Instagram, href: site.socials.instagram, label: 'Instagram' },
    { icon: Facebook, href: site.socials.facebook, label: 'Facebook' },
    { icon: Youtube, href: site.socials.youtube, label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full bg-cream p-1 ring-1 ring-gold/60">
              <Image
                src="/images/logo.webp"
                alt={`${site.name} logo`}
                width={56}
                height={56}
                loading="lazy"
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="font-display text-xl uppercase leading-none tracking-wider">
              <span className="gold-text">Muscle</span> <span className="text-ink">Fitness</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            {site.description}
          </p>
          <p className="mt-4 font-display text-sm uppercase tracking-[0.3em] text-gold-dark">
            {site.tagline}
          </p>

          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${s.label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:shadow-gold"
              >
                <s.icon size={17} aria-hidden />
              </a>
            ))}
          </div>
        </div>


        <nav aria-label="Footer">
          <h3 className="font-display text-lg uppercase tracking-[0.2em] text-ink">
            Quick Links
          </h3>
          <div className="mt-4 h-px w-12 bg-gold-gradient" />
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted transition-colors hover:text-gold-dark">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-lg uppercase tracking-[0.2em] text-ink">Contact</h3>
          <div className="mt-4 h-px w-12 bg-gold-gradient" />
          <ul className="mt-5 space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden />
              <address className="not-italic leading-relaxed">
                {site.address.line1}, {site.address.line2}, {site.address.city},{' '}
                {site.address.state} {site.address.postalCode}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="shrink-0 text-gold-dark" aria-hidden />
              <a href={`tel:${site.phoneRaw}`} className="transition-colors hover:text-gold-dark">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="shrink-0 text-gold-dark" aria-hidden />
              <a
                href={`mailto:${site.email}`}
                className="break-all transition-colors hover:text-gold-dark"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg uppercase tracking-[0.2em] text-ink">Hours</h3>
          <div className="mt-4 h-px w-12 bg-gold-gradient" />
          {/* Fixed narrow column for the day, then the time right next to it.
              justify-between was pushing the time to the far edge and leaving a
              wide gap in the middle of each row. */}
          <ul className="mt-5 space-y-2.5 text-sm">
            {hours.map((d) => (
              <li key={d.day} className="grid grid-cols-[2.5rem_auto] items-baseline gap-x-2">
                <span className="text-muted">{d.short}</span>
                <span className="whitespace-nowrap tabular-nums text-ink/80">
                  {formatRange(d)}
                </span>
              </li>
            ))}
          </ul>
        </div>


      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="hidden md:block">Gym in Saidapet, Chennai · {site.shortName}</p>
          <p>
            Powered by{' '}
            {site.poweredBy.url ? (
              <a
                href={site.poweredBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold transition-colors hover:text-gold-light hover:underline"
              >
                {site.poweredBy.name}
              </a>
            ) : (
              <span className="font-semibold text-gold">{site.poweredBy.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
