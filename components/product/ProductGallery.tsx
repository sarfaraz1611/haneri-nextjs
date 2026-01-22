"use client";

import Image from "next/image";
import { Variant } from "./types";

interface ProductGalleryProps {
  images: string[];
  currentImageIndex: number;
  onImageSelect: (index: number) => void;
  productName: string;
  selectedVariant: Variant | null;
}

export default function ProductGallery({
  images,
  currentImageIndex,
  onImageSelect,
  productName,
  selectedVariant,
}: ProductGalleryProps) {
  const safeImageIndex =
    images.length > 0
      ? Math.max(0, Math.min(currentImageIndex, images.length - 1))
      : 0;

  return (
    <div className="lg:pr-4">
      <div className="relative h-[320px] lg:h-[650px] flex items-center justify-center">
        {images.length > 0 && images[safeImageIndex] ? (
          <div className="relative w-full h-full">
            <Image
              src={images[safeImageIndex]}
              alt={productName || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain"
              priority={currentImageIndex === 0}
              {...(currentImageIndex !== 0 && { loading: "lazy" })}
              onError={() => {
                console.error("Image failed to load:", images[safeImageIndex]);
              }}
              onLoad={() => {}}
            />
          </div>
        ) : (
          <NoImagePlaceholder selectedVariant={selectedVariant} />
        )}
      </div>

      {images.length > 0 && (
        <Thumbnails
          images={images}
          currentIndex={safeImageIndex}
          onSelect={onImageSelect}
          productName={productName}
        />
      )}

      {selectedVariant?.banner_urls && selectedVariant.banner_urls.length > 0 && (
        <BannerImages bannerUrls={selectedVariant.banner_urls} />
      )}
    </div>
  );
}

function NoImagePlaceholder({
  selectedVariant,
}: {
  selectedVariant: Variant | null;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="text-center p-4">
        <p className="text-sm font-semibold">No image available</p>
        {selectedVariant ? (
          <>
            <p className="text-xs mt-1 text-gray-500">
              Variant: {selectedVariant.variant_value}
            </p>
            <p className="text-xs mt-1 text-gray-500">
              file_urls: {selectedVariant.file_urls?.length || 0} images
            </p>
            <p className="text-xs mt-1 text-gray-500">
              banner_urls: {selectedVariant.banner_urls?.length || 0} images
            </p>
          </>
        ) : (
          <p className="text-xs mt-1 text-gray-500">No variant selected</p>
        )}
      </div>
    </div>
  );
}

interface ThumbnailsProps {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  productName: string;
}

function Thumbnails({
  images,
  currentIndex,
  onSelect,
  productName,
}: ThumbnailsProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-3">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`aspect-square rounded-lg border overflow-hidden relative ${
            currentIndex === i
              ? "border-[#075E5E] border-2"
              : "border-gray-200"
          }`}
        >
          <Image
            src={img}
            alt={`${productName || "Product"} - Image ${i + 1}`}
            fill
            sizes="(max-width: 768px) 25vw, 20vw"
            className="object-contain"
          />
        </button>
      ))}
    </div>
  );
}

interface BannerImagesProps {
  bannerUrls: string[];
}

function BannerImages({ bannerUrls }: BannerImagesProps) {
  return (
    <div className="mt-6 space-y-3">
      {bannerUrls.map((bannerUrl, index) => (
        <div key={index} className="relative w-full aspect-video">
          <Image
            src={bannerUrl}
            alt={`Product banner ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover rounded-lg"
            priority={index === 0}
            {...(index !== 0 && { loading: "lazy" })}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            }}
          />
        </div>
      ))}
    </div>
  );
}
