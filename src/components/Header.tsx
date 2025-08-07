
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { X, ParkingCircle } from 'lucide-react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import AnimatedBurgerIcon from './AnimatedBurgerIcon';
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // We need a short timeout to allow the SheetContent to render and the ref to be attached.
      setTimeout(() => {
        if (navRef.current) {
          const links = Array.from(navRef.current.children);
          gsap.fromTo(
            links,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power3.out',
              delay: 0.2, 
            }
          );
        }
      }, 50);
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image src={"/images/logo.png"} width={40} height={40} alt="ParkProfit Logo"/>
           <span className="font-bold font-headline text-xl">ParkProfit</span>
        </Link>
        
        <div className="flex-grow" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <AnimatedBurgerIcon />
              <span className="sr-only">Άνοιγμα μενού</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <SheetHeader className="p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image src={"/images/logo.png"} width={40} height={40} alt="ParkProfit Logo"/>
                </Link>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav ref={navRef} className="flex flex-col items-center justify-center flex-1 gap-8">
                  <Link href="#contact" onClick={handleLinkClick} className="text-2xl font-semibold hover:text-primary transition-colors">
                      Επικοινωνία
                  </Link>
                  <Link href="#services" onClick={handleLinkClick} className="text-2xl font-semibold hover:text-primary transition-colors">
                      Υπηρεσίες
                  </Link>
                  <Link href="#roi-calculator" onClick={handleLinkClick} className="text-2xl font-semibold hover:text-primary transition-colors">
                      Υπολογιστής ROI
                  </Link>
                  <Link href="#testimonials" onClick={handleLinkClick} className="text-2xl font-semibold hover:text-primary transition-colors">
                      Μαρτυρίες
                  </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
