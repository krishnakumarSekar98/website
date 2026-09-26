import Image from 'next/image';

/** Heavily darkened, blurred gym photo used as section texture.
 *  Sits behind content at low opacity so text contrast is unaffected. */
export default function SectionBg({
  src,
  opacity = 'opacity-[0.42]',
}: {
  src: string;
  opacity?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className={`object-cover ${opacity}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-page/85 via-page/45 to-page/85" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line" />
    </div>
  );
}
