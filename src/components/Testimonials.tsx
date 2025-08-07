import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Γιάννης Π.',
    title: 'Ιδιοκτήτης Ακινήτου, Αθήνα',
    quote: 'Η Parking Management μετέτρεψε το άδειο μου οικόπεδο σε μια μηχανή παραγωγής χρημάτων. Ο επαγγελματισμός και η αποτελεσματικότητά τους είναι απαράμιλλα. Το συστήνω ανεπιφύλακτα!',
    avatar: 'ΓΠ',
  },
  {
    name: 'Μαρία Κ.',
    title: 'Διαχειρίστρια Κτιρίου, Θεσσαλονίκη',
    quote: 'Η μεταμόρφωση του υπόγειου γκαράζ μας ήταν απίστευτη. Τα έσοδα έχουν τριπλασιαστεί και οι ένοικοι είναι πιο ευχαριστημένοι με το οργανωμένο σύστημα.',
    avatar: 'ΜΚ',
  },
  {
    name: 'Γιώργος Σ.',
    title: 'Επενδυτής, Πάτρα',
    quote: 'Ήμουν επιφυλακτικός στην αρχή, αλλά το ROI μιλάει από μόνο του. Η ομάδα χειρίστηκε τα πάντα, από την εγκατάσταση μέχρι την καθημερινή λειτουργία, άψογα.',
    avatar: 'ΓΣ',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Ιστορίες Επιτυχίας</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
            Ακούστε τις εμπειρίες ιδιοκτητών ακινήτων που συνεργάστηκαν μαζί μας για να μετατρέψουν τους χώρους τους σε κέρδος.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <CardContent className="p-8 flex-grow flex flex-col">
                 <Quote className="w-10 h-10 text-primary mb-6" />
                <p className="text-muted-foreground italic mb-6 flex-grow leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://placehold.co/48x48.png" alt={testimonial.name} data-ai-hint="person portrait" />
                    <AvatarFallback className="text-lg">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-headline text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}