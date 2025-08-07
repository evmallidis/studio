
'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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
          
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src={"/images/logo.png"} width={60} height={60} alt="ParkProfit Logo"/>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Αν θέλετε να ξεχωρίζει η επιχείρησή σας, επιλέξτε την παροχή επιπλέον υπηρεσιών στους επισκέπτες σας με λίγες απλές κινήσεις... Ρωτήστε μας.
            </p>
             <p className="text-muted-foreground font-semibold max-w-xs leading-relaxed">
              Αποκλειστική συνεργασία με το Cloud parking management.
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
            <div className="space-y-4 text-muted-foreground">
               <div className="flex items-center justify-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>Καλλιρόης 89, ΤΚ 11745 ΑΘΗΝΑ</span>
              </div>
              <a href="tel:+302103210026" className="flex items-center justify-center gap-3 hover:underline">
                <Phone className="h-5 w-5" />
                <span>Κεντρικά: 210 32 100 26</span>
              </a>
               <a href="tel:+306972117800" className="flex items-center justify-center gap-3 hover:underline">
                <Phone className="h-5 w-5" />
                <span>Κινητό: 6972 117 800</span>
              </a>
              <a href="mailto:info@parkingmanagement.gr" className="flex items-center justify-center gap-3 hover:underline">
                <Mail className="h-5 w-5" />
                <span>info@parkingmanagement.gr</span>
              </a>
               <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5" />
                <span>09:00 - 21:00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm text-muted-foreground/60">
          <p>&copy; {year} UPIO. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </div>
    </footer>
  );
}
