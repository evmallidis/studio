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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedRoad />
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Services />
        <RoiCalculator />
        <Testimonials />
        <Stats />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
