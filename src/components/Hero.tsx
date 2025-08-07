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
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

export default function Hero() {


  const images = [
    "/images/OK421.jpg", // Replace with your image source
    "/images/OK382.jpg", // Replace with your image source
    // "https://placehold.co/1920x1080/red", // Replace with your image source
  ];

  const data = [
    {
      "id": 1,
      "title": "Μετατρέψτε τον Αχρησιμοποίητο Χώρο σας σε Κέρδος",
      "tagline": "Ενοικιάζουμε τον χώρο σας και τον μετατρέπουμε σε μια κερδοφόρα επιχείρηση στάθμευσης αυτοκινήτων. Η Parking Management είναι ο ειδικός συνεργάτης σας για τη δημιουργία άνετων και επικερδών εγκαταστάσεων στάθμευσης.",
      "image": "/images/OK421.jpg",
      "buttons": [
        {
          "id": 1,
          "text": "Roberto Nickson",
          "link": "https://www.pexels.com/@rpnickson/",
          "type": "btn-dark btn-circle"
        }
      ]
    },
    {
      "id": 2,
      "title": "ΔΟΚΙΜΑΣΕ ΤΟ",
      "tagline": "ΑΝ ΣΟΥ ΑΡΕΣΕΙ",
      "image": "/images/OK382.jpg",
      "buttons": [
        {
          "id": 1,
          "text": "Julia M Cameron",
          "link": "https://www.pexels.com/@julia-m-cameron/",
          "type": "btn-dark btn-circle"
        }
      ]
    }
  ];
  
  return (
    <>
    <section className="w-full">
      <div className="h-[80vh]">
        <ul className="h-full w-full">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={5000}
            effect={'fade'}
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
          >
            {data.map(({ id, image, tagline, title, buttons }) => (
              <SwiperSlide key={id}>
                <div
                  className="h-full w-full absolute left-0 top-0"
                  style={{
                    background: `url(${image}) center center / cover scroll no-repeat`,
                  }}
                ></div>
                <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    {tagline && (
                      <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white">
                        {tagline}
                      </p>
                    )}
                    <p className="text-3xl sm:text-6xl lg:text-8xl font-bold text-white">
                      {title}
                    </p>
                    {buttons.length > 0 ? (
                      <p className=" bg-gray-800 inline-block px-9 py-2 rounded-full text-white mt-10 lg:mt-20">
                        {/* <SliderButtons buttons={buttons} /> */}
                      </p>
                    ) : null}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>

    
    
    </>
  );
}
