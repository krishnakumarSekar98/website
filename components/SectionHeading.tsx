import Reveal from './Reveal';

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: Props) {
  const centered = align === 'center';

  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading mt-3">
        {title} {highlight && <span className="gold-text">{highlight}</span>}
      </h2>
      <div className={`mt-5 h-px w-24 bg-gold-gradient ${centered ? 'mx-auto' : ''}`} />
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}
