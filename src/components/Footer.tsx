
'use client';

import { ParkingCircle, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ParkingCircle className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">ParkProfit</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-xs">
              Your trusted partner in parking management and profitability.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 font-headline">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:underline text-primary-foreground/80">Outdoor Spaces</Link></li>
              <li><Link href="#services" className="hover:underline text-primary-foreground/80">Covered Parking</Link></li>
              <li><Link href="#services" className="hover:underline text-primary-foreground/80">Multi-story Buildings</Link></li>
              <li><Link href="#services" className="hover:underline text-primary-foreground/80">Existing Lots</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 font-headline">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:contact@parkprofit.com" className="flex items-center justify-center md:justify-start gap-3 hover:underline text-primary-foreground/80">
                <Mail className="h-5 w-5" />
                <span>contact@parkprofit.com</span>
              </a>
              <a href="tel:+302101234567" className="flex items-center justify-center md:justify-start gap-3 hover:underline text-primary-foreground/80">
                <Phone className="h-5 w-5" />
                <span>+30 210 123 4567</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>&copy; {year} ParkProfit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
