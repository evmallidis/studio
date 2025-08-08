import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ParkingCircle, ParkingSquare, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Sun,
    title: 'Υπαίθριοι Χώροι',
    description: 'Βελτιστοποιούμε υπαίθριους χώρους για μέγιστη χωρητικότητα και αποδοτικότητα.',
  },
  {
    icon: ParkingSquare,
    title: 'Στεγασμένοι & Υπόγειοι',
    description: 'Μετατρέπουμε στεγασμένους ή υπόγειους χώρους σε ασφαλείς, premium θέσεις στάθμευσης.',
  },
  {
    icon: Building2,
    title: 'Πολυώροφα Κτίρια',
    description: 'Μετατρέπουμε ολόκληρα κτίρια σε υψηλής χωρητικότητας, κερδοφόρες εγκαταστάσεις στάθμευσης.',
  },
  {
    icon: ParkingCircle,
    title: 'Υφιστάμενοι Χώροι Στάθμευσης',
    description: 'Αναβαθμίζουμε και διαχειριζόμαστε υπάρχουσες εγκαταστάσεις για αύξηση εσόδων και ικανοποίησης πελατών.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <div className="relative text-center mb-12 z-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Οι Λύσεις Στάθμευσης Μας</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
            Αναλαμβάνουμε τα πάντα, μετατρέποντας οποιονδήποτε χώρο σε μια επαγγελματική εγκατάσταση στάθμευσης.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <CardTitle className="mb-2 font-headline text-lg">{service.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
