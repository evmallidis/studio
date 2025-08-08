'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { submitQuoteForm } from '@/lib/actions';

const formSchema = z.object({
  municipality: z.string().min(1, 'Ο Δήμος είναι υποχρεωτικός.'),
  propertyType: z.string().min(1, 'Παρακαλώ επιλέξτε τύπο ακινήτου.'),
  totalArea: z.coerce.number().min(1, 'Η συνολική έκταση είναι υποχρεωτική.'),
  area: z.string().min(1, 'Η περιοχή είναι υποχρεωτική.'),
  collaborationType: z.string().min(1, 'Παρακαλώ επιλέξτε τύπο συνεργασίας.'),
  email: z.string().email('Μη έγκυρη διεύθυνση email.'),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function QuoteFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      municipality: '',
      propertyType: '',
      area: '',
      collaborationType: '',
      email: '',
      comments: '',
    },
  });

  const onSubmit = useCallback(
    async (values: FormData) => {
      setIsLoading(true);
      if (!executeRecaptcha) {
        toast({
          variant: 'destructive',
          title: 'Σφάλμα',
          description: 'Το reCAPTCHA δεν είναι έτοιμο. Παρακαλώ δοκιμάστε ξανά.',
        });
        setIsLoading(false);
        return;
      }

      try {
        const token = await executeRecaptcha('quoteFormSubmit');
        const response = await submitQuoteForm({ ...values, recaptchaToken: token });

        if (response.success) {
          toast({
            title: 'Η Φόρμα Υποβλήθηκε!',
            description: response.message,
          });
          form.reset();
        } else {
          toast({
            variant: 'destructive',
            title: 'Σφάλμα Υποβολής',
            description: response.message,
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Σφάλμα',
          description: 'Παρουσιάστηκε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [executeRecaptcha, toast, form]
  );

  return (
    <section id="quote-form" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Αίτηση Προσφοράς</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
              Ενδιαφέρεστε για τις υπηρεσίες μας; Συμπληρώστε την παρακάτω φόρμα για να λάβετε μια εξατομικευμένη προσφορά.
            </p>
          </div>
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="municipality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Δήμος</FormLabel>
                          <FormControl><Input placeholder="π.χ., Αθήνα" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Περιοχή</FormLabel>
                          <FormControl><Input placeholder="π.χ., Κολωνάκι" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Τύπος Ακινήτου</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Επιλέξτε τύπο ακινήτου" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Parking σε λειτουργία">Parking σε λειτουργία</SelectItem>
                              <SelectItem value="Υπαίθριος χώρος">Υπαίθριος χώρος</SelectItem>
                              <SelectItem value="Κλειστός χώρος">Κλειστός χώρος</SelectItem>
                              <SelectItem value="Αδιαμόρφωτος χώρος">Αδιαμόρφωτος χώρος</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="collaborationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Τύπος Συνεργασίας</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Επιλέξτε τύπο συνεργασίας" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Μίσθωση">Μίσθωση</SelectItem>
                              <SelectItem value="Διαμόρφωση">Διαμόρφωση</SelectItem>
                              <SelectItem value="Οργάνωση">Οργάνωση</SelectItem>
                              <SelectItem value="Διαχείριση">Διαχείριση</SelectItem>
                              <SelectItem value="Εξοπλισμός">Εξοπλισμός</SelectItem>
                              <SelectItem value="Στελέχωση">Στελέχωση</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Συνολική Έκταση (τ.μ.)</FormLabel>
                          <FormControl><Input type="number" placeholder="π.χ., 2000" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Σχόλια & Τηλέφωνο Επικοινωνίας</FormLabel>
                        <FormControl><Textarea rows={4} placeholder="Αφήστε τα σχόλιά σας και ένα τηλέφωνο επικοινωνίας εδώ..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    Υποβολή Αιτήματος
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function QuoteForm() {
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!recaptchaKey) {
        return (
            <div className="container text-center py-8">
                <p className="text-destructive">Το κλειδί reCAPTCHA δεν έχει ρυθμιστεί. Η φόρμα είναι απενεργοποιημένη.</p>
            </div>
        );
    }
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
            <QuoteFormComponent />
        </GoogleReCaptchaProvider>
    );
}
