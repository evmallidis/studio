
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, X, ParkingCircle } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        navLinksRef.current?.children!,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2, // Delay to allow sheet to slide in
        }
      );
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <ParkingCircle className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">ParkProfit</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          {/* Unified Navigation */}
          <div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent ref={menuRef} side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="p-4 border-b flex-row justify-between items-center">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <ParkingCircle className="h-6 w-6 text-primary" />
                      <SheetTitle>
                        <span className="font-bold text-lg font-headline">ParkProfit</span>
                      </SheetTitle>
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <nav ref={navLinksRef} className="flex flex-col items-center justify-center flex-1 gap-8">
                     <SheetClose asChild>
                        <Link href="#contact" className="text-2xl font-semibold hover:text-primary transition-colors">
                            Contact Us
                        </Link>
                     </SheetClose>
                     <SheetClose asChild>
                        <Link href="#services" className="text-2xl font-semibold hover:text-primary transition-colors">
                            Services
                        </Link>
                     </SheetClose>
                     <SheetClose asChild>
                        <Link href="#roi-calculator" className="text-2xl font-semibold hover:text-primary transition-colors">
                            ROI Calculator
                        </Link>
                     </SheetClose>
                      <SheetClose asChild>
                        <Link href="#testimonials" className="text-2xl font-semibold hover:text-primary transition-colors">
                            Testimonials
                        </Link>
                     </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
