import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import RoiCalculator from '@/components/RoiCalculator';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <RoiCalculator />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
