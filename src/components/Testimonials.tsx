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
    name: 'Yiannis P.',
    title: 'Property Owner, Athens',
    quote: 'Parking Management turned my empty lot into a cash-generating machine. Their professionalism and efficiency are unmatched. Highly recommended!',
    avatar: 'YP',
  },
  {
    name: 'Maria K.',
    title: 'Building Manager, Thessaloniki',
    quote: 'The transformation of our underground garage was incredible. Revenue has tripled, and our tenants are happier with the organized system.',
    avatar: 'MK',
  },
  {
    name: 'George S.',
    title: 'Investor, Patra',
    quote: 'I was skeptical at first, but the ROI speaks for itself. The team handled everything from setup to daily operations seamlessly.',
    avatar: 'GS',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Success Stories</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
            Hear from property owners who have partnered with us to turn their spaces into profit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-white shadow-lg flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                 <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt={testimonial.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-headline">{testimonial.name}</p>
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
