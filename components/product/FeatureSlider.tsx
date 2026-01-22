"use client";

import Image from "next/image";
import { FeatureIcon } from "./types";
import { DEFAULT_FEATURE_ICONS } from "./constants";

interface FeatureSliderProps {
  featureIcons?: FeatureIcon[];
}

export default function FeatureSlider({ featureIcons }: FeatureSliderProps) {
  const icons =
    featureIcons && Array.isArray(featureIcons) && featureIcons.length > 0
      ? featureIcons
      : DEFAULT_FEATURE_ICONS;

  return (
    <div className="relative mt-6 overflow-hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {icons.map((feature) => (
          <FeatureItem key={`first-${feature.id}`} feature={feature} />
        ))}
        {icons.map((feature) => (
          <FeatureItem key={`second-${feature.id}`} feature={feature} />
        ))}
      </div>
    </div>
  );
}

interface FeatureItemProps {
  feature: FeatureIcon;
}

function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <div className="shrink-0 flex flex-col items-center justify-center w-24 text-center mx-2">
      <div className="w-8 h-8 relative mb-2">
        <Image
          src={feature.icon_url}
          alt={feature.label}
          fill
          sizes="66px"
          className="object-contain"
          loading="lazy"
        />
      </div>
      <div
        className="text-xs text-[#CA5D27] font-semibold leading-tight"
        style={{ whiteSpace: "pre-line" }}
      >
        {feature.label}
      </div>
    </div>
  );
}
