"use client";
import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";

const images: string[] = ["/image/gambar2.jpg", "/image/gambar2.jpg", "/image/gambar2.jpg", "/image/gambar2.jpg"];

const imageByIndex = (index: number): string => images[index % images.length];

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="rounded-full flex overflow-hidden w-16 h-16 bg-red-50 p-[2px] bg-gradient-to-r from-[#FECD00] via-[#F9373F] to-[#C913B9]">
                  <Image src={"/image/gambar2.jpg"} alt="profile" width={100} height={100} className="object-cover w-full h-full rounded-full bg-blue-400  border-black border-4" />
                </div>
                <p className="text-[10px] font-semibold">izzycracker04</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
