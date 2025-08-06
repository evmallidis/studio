"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function Hero() {
  const images = [
    "/images/OK421.jpg", // Replace with your image source
    // "https://placehold.co/1920x1080/blue", // Replace with your image source
    // "https://placehold.co/1920x1080/red", // Replace with your image source
  ];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full relative"><Image src={image} alt={`Hero Background ${index + 1}`} layout="fill" objectFit="cover" /></SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white relative z-10">
        <h1 className="text-5xl font-bold md:text-6xl drop-shadow-lg">
          Turn Your Unused Space into Profit
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-2xl drop-shadow-lg">
          We rent your space and transform it into a profitable car parking business. Parking Management is your expert partner for creating comfortable and lucrative parking facilities.
        </p>
        <div className="mt-8">
          {/* Play button - add your video player logic here */}
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4"
          >
            Play Video
          </Button>
        </div>
      </div>
    </section>
  );
}
