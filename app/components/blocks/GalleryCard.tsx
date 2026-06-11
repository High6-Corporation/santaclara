import Link from "next/link";

interface GalleryCardProps {
  image: string;
  title: string;
  href: string;
}

export function GalleryCard({ image, title, href }: GalleryCardProps) {
  return (
    <Link
      href={href}
      className="block bg-black h-[320px] sm:h-[360px] lg:h-[420px] overflow-hidden relative w-full group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt={title}
          className="w-full h-full object-cover"
          src={image}
        />
      </div>

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-400 ease-out" />

      {/* Hover text panel - slides up from bottom */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-[60px] pb-[24px] px-[24px] lg:px-[30px]">
        <div className="flex items-end justify-between gap-[12px]">
          <div className="flex flex-col gap-[6px]">
            <p className="font-body font-semibold text-[18px] lg:text-[22px] leading-[1.3] text-white tracking-[-0.88px]">
              {title}
            </p>
            <p className="font-body font-normal text-[13px] lg:text-[14px] leading-[1.5] text-white/80 tracking-[-0.28px]">
              View more of the gallery
            </p>
          </div>
          <div className="shrink-0 size-[24px] lg:size-[28px] transition-transform duration-300 ease-in-out group-hover:rotate-[-45deg]">
            <img
              src="/images/arrow-icon.svg"
              alt="Arrow icon"
              className="block size-full"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
