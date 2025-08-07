"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination,  Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';

// Our custom button component
interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
}

export default function Hero() {

  const data: Slide[] = [
    {
      "id": 1,
      "title": "Μετατρέψτε τον Αχρησιμοποίητο Χώρο σας σε Κέρδος",
      "tagline": "Αξιοποιούμε τον χώρο σας και τον μετατρέπουμε σε μια κερδοφόρα επιχείρηση στάθμευσης. Γίνετε ο συνεργάτης μας για τη δημιουργία σύγχρονων και αποδοτικών εγκαταστάσεων.",
      "image": "/images/row-img-04.jpg",
    },
    {
      "id": 2,
      "title": "Έξυπνη Διαχείριση, Μεγαλύτερα Κέρδη",
      "tagline": "Αναβαθμίστε τον υπάρχοντα χώρο στάθμευσής σας με τεχνολογία αιχμής και επαγγελματική διαχείριση. Αυξήστε τα έσοδα και την ικανοποίηση των πελατών σας μαζί μας.",
      "image": "/images/sidebar-img-01.jpg",
    }
  ];
  
  return (
    <section className="w-full relative">
      <div className="h-[85vh] max-h-[900px]">
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          speed={1500}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className="h-full"
        >
          {data.map(({ id, image, tagline, title }) => (
            <SwiperSlide key={id}>
              <div
                className="h-full w-full absolute inset-0"
                style={{
                  background: `url(${image}) center center / cover scroll no-repeat`,
                }}
              ></div>
              <div className="h-full w-full absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                <div className="text-center container max-w-4xl px-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline !leading-tight tracking-tighter">
                    {title}
                  </h1>
                   {tagline && (
                    <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/90">
                      {tagline}
                    </p>
                  )}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground py-7 px-8 text-lg">
                      <Link href="#roi-calculator">Υπολογιστής ROI</Link>
                    </Button>
                     <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/50 hover:bg-white/20 text-white py-7 px-8 text-lg">
                      <Link href="#contact">Επικοινωνήστε Μαζί Μας</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}