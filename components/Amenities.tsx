import { Check } from 'lucide-react';
import Reveal from './Reveal';
import SectionBg from './SectionBg';
import SectionHeading from './SectionHeading';
import { amenities } from '@/config/site';

export default function Amenities() {
  return (
    <section className="section relative">
      <SectionBg src="/images/bg/rack.jpg" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Facilities"
          title="Everything Under"
          highlight="One Roof"
          subtitle="Full amenities for fitness fans — from the training floor to the small things that make a session easy."
        />

        {/* TODO: edit this list in /config/site.ts (amenities). */}
        <Reveal className="mt-12">
          <ul className="flex flex-wrap justify-center gap-3">
            {amenities.map((a) => (
              <li
                key={a}
                className="group flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2.5 text-sm text-ink/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold-dark hover:shadow-gold"
              >
                <Check
                  size={14}
                  className="text-gold-dark transition-transform duration-300 group-hover:scale-125"
                  aria-hidden
                />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
