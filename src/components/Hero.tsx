import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
            Turn Your Unused Space into Profit
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            We rent your space and transform it into a profitable car parking business. Parking Management is your expert partner for creating comfortable and lucrative parking facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#roi-calculator">Estimate Your ROI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#services">Our Solutions</Link>
            </Button>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Modern parking garage"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="parking garage"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
