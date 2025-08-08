import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Hammer, Wrench, ParkingCircle, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface ServiceDetail {
  icon: LucideIcon;
  title: string;
}

const serviceDetails: ServiceDetail[] = [
    {
      icon: Handshake,
      title: 'Τη  Μίσθωση του χώρου σας για λειτουργία ως χώρο στάθμευσης.',
    },
    {
      icon: Hammer,
      title: 'Τη Διαμόρφωση κάθε χώρου σε χώρο Στάθμευσης',
    },
    {
      icon: Wrench,
      title: 'Την Οργάνωση του χώρου ώστε να αποτελέσει έναν ελκυστικό και ασφαλή χώρο Στάθμεyσης.',
    },
    {
      icon: ParkingCircle,
      title: 'Τον Εξοπλισμό του Parking σας με Αυτόματα μηχανήματα, Αντικείμενα Σήμανσης και γενικότερα τα πάντα σχετικά με έναν χώρο Parking.',
    },
    {
      icon: Users,
      title: 'Τη Διαχείριση του χώρου σας με τη μοναδική πείρα της ομάδας μας.',
    },
];

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            Τι σας προσφέρει η Parking Management
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            Στην Parking Management παρέχουμε υπηρεσίες που αφορούν τους επαγγελματικούς χώρους στάθμευσης.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="prose lg:prose-lg max-w-none text-foreground/90">
                <p>Έχουμε την εμπειρία να αναγνωρίσουμε αν ένα ακίνητο δύναται να διαμορφωθεί ως χώρος Στάθμευσης.</p>
                <p>Έχουμε την τεχνογνωσία να τον διαμορφώσουμε σε χώρο στάθμευσης είτε αποξηλώνοντας ή ακόμα και γκρεμίζοντας οτιδήποτε περιττό.</p>
                <p>Αν ο χώρος χρησιμοποιείται ήδη ως Parking, έχουμε την πείρα να τον ανακαινίσουμε και να τον αναβαθμίσουμε με βάση τις πραγματικές ανάγκες και προοπτικές του.</p>
                
                <h3 className="font-headline text-2xl text-primary mt-12">Εξοπλισμός & Προσωπικό</h3>
                <p>Διαθέτουμε έμπειρους μηχανικούς, ικανούς να οργανώσουν το Parking σας και να το εξοπλίσουν κατάλληλα, πάντα με γνώμονα την καλύτερη σχέση Ποιότητας – Κόστους – Κέρδους.</p>
                <p>Αν χρειάζεστε προσωπικό για εργασία, μπορούμε να αναλάβουμε την στελέχωση της επιχείρησής σας με προσεκτικά επιλεγμένους ανθρώπους από την ομάδα μας.</p>
                <p>Αν διαθέτετε όλα τα παραπάνω και χρειάζεστε κάποιον να διαχειριστεί τον χώρο Parking σας, γνωρίζουμε πως η σωστή διαχείριση γίνεται από σωστούς επαγγελματίες.</p>
                <p className="font-semibold text-primary/90">Η ομάδα της Parking Management είναι η εγγυημένη λύση σε οποιαδήποτε κατάσταση βρίσκεστε.</p>
            </div>
            
            <div className="space-y-8">
                 <div className="text-left mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Αναλαμβάνουμε</h2>
                 </div>
                 <div className="space-y-6">
                    {serviceDetails.map((service, index) => (
                        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="flex items-center gap-6 p-6">
                            <div className="bg-primary/10 p-4 rounded-lg">
                            <service.icon className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-base text-muted-foreground font-medium">{service.title}</p>
                        </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
