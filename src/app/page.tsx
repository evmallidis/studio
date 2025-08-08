'use client'
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import RoiCalculator from '@/components/RoiCalculator';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import AnimatedRoad from '@/components/AnimatedRoad';
import Faq from '@/components/Faq';

export default function Home() {
  return (
    <div className="relative">
        <div className="flex flex-col min-h-screen">
          <AnimatedRoad />
          <Header />
          <main className="flex-grow flex flex-col items-center justify-between relative z-10">
            <Hero />
            <Services />
            <RoiCalculator />
            <Testimonials />
            <Faq />
            <Stats />
            <QuoteForm />
          </main>
          <Footer />
        </div>
    </div>
  );
}
