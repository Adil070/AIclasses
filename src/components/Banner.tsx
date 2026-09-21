import type { Banner as BannerType } from "@/lib/data/types";
import BannerCarousel from "@/components/BannerCarousel";

export default function Banner({ banners }: { banners: BannerType[] }) {
  if (banners.length === 0) return null;
  return <BannerCarousel banners={banners} />;
}
