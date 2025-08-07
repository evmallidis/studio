
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X, ParkingCircle } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                     <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <ParkingCircle className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg font-headline">ParkProfit</span>
                      </Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col items-center justify-center flex-1 gap-8">
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
