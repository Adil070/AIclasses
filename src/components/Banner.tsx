import Image from "next/image";
import { Bell, Sparkles } from "lucide-react";
import type { Banner as BannerType } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

export default function Banner({ banners }: { banners: BannerType[] }) {
  if (banners.length === 0) return null;

  return (
    <div className="space-y-px">
      {banners.map((banner) => (
        <section key={banner.id} className="relative py-10 overflow-hidden bg-ink">
          {banner.imageUrl && (
            <>
              <Image
                src={banner.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-ink/75" />
            </>
          )}
          <div className="relative section">
            <Reveal>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
                <div className="flex items-center gap-5">
                  <div className="hidden sm:flex bg-white/10 rounded-2xl p-3">
                    <Sparkles size={26} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                      <Bell size={13} />
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                        Announcement
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {banner.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/70 max-w-sm leading-relaxed text-sm md:text-base">
                  {banner.message}
                </p>

                {banner.badgeText && (
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center bg-white text-ink font-semibold px-6 py-3 rounded-full text-sm">
                      {banner.badgeText}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
