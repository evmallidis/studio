
'use client';

import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from "next/image"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="bg-secondary text-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src={"/images/logo.png"} width={40} height={40} alt="ParkProfit Logo"/>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Ο αξιόπιστος συνεργάτης σας στη διαχείριση και κερδοφορία χώρων στάθμευσης.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 font-headline uppercase tracking-wider text-foreground">Υπηρεσίες</h3>
            <ul className="space-y-3">
              <li><Link href="#services" className="hover:underline text-muted-foreground">Υπαίθριοι Χώροι</Link></li>
              <li><Link href="#services" className="hover:underline text-muted-foreground">Στεγασμένοι Χώροι</Link></li>
              <li><Link href="#services" className="hover:underline text-muted-foreground">Πολυώροφα Κτίρια</Link></li>
              <li><Link href="#services" className="hover:underline text-muted-foreground">Υφιστάμενοι Χώροι</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 font-headline uppercase tracking-wider text-foreground">Επικοινωνία</h3>
            <div className="space-y-4">
              <a href="mailto:contact@parkprofit.com" className="flex items-center justify-center gap-3 hover:underline text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>contact@parkprofit.com</span>
              </a>
              <a href="tel:+302101234567" className="flex items-center justify-center gap-3 hover:underline text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>+30 210 123 4567</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm text-muted-foreground/60">
          <p>&copy; {year} ParkProfit. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </div>
    </footer>
  );
}
