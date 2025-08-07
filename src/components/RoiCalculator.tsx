'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import type { RoiEstimationOutput } from '@/ai/flows/roi-estimation';
import { getRoiEstimation } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, TrendingUp, Calculator } from 'lucide-react';

const formSchema = z.object({
  spaceType: z.enum(['Υπαίθριος', 'Στεγασμένος', 'Πολυώροφος'], { required_error: 'Παρακαλώ επιλέξτε τύπο χώρου.' }),
  spaceSizeSqFt: z.coerce.number().min(10, 'Ο χώρος πρέπει να είναι τουλάχιστον 10 τ.μ.'),
  location: z.string().min(3, 'Η τοποθεσία είναι υποχρεωτική.'),
  averageParkingRate: z.coerce.number().min(0.1, 'Η τιμή πρέπει να είναι θετική.'),
  occupancyRate: z.coerce.number().min(0.01, 'Το ποσοστό πρέπει να είναι μεταξύ 0.01 και 1.').max(1, 'Το ποσοστό πρέπει να είναι μεταξύ 0.01 και 1.'),
  peakHoursPerDay: z.coerce.number().min(1, 'Οι ώρες πρέπει να είναι μεταξύ 1 και 24.').max(24, 'Οι ώρες πρέπει να είναι μεταξύ 1 και 24.'),
});

type FormData = z.infer<typeof formSchema>;

export default function RoiCalculator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RoiEstimationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);

    const response = await getRoiEstimation(values);

    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Σφάλμα',
        description: response.error || 'Η εκτίμηση ROI απέτυχε. Παρακαλώ δοκιμάστε ξανά.',
      });
    }
  }

  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Δωρεάν Εκτίμηση ROI</h2>
            <p className="max-w-2xl mt-4 text-muted-foreground md:text-lg">
              Χρησιμοποιήστε το εργαλείο μας με τεχνητή νοημοσύνη για να λάβετε μια άμεση εκτίμηση των πιθανών εσόδων σας από τη στάθμευση. Απλώς συμπληρώστε τις λεπτομέρειες για τον χώρο σας.
            </p>
            <Card className="mt-8 shadow-lg rounded-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="spaceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Τύπος Χώρου</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Επιλέξτε τύπο χώρου" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Υπαίθριος">Υπαίθριος</SelectItem>
                              <SelectItem value="Στεγασμένος">Στεγασμένος / Υπόγειος</SelectItem>
                              <SelectItem value="Πολυώροφος">Πολυώροφο Κτίριο</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="spaceSizeSqFt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Μέγεθος Χώρου (τ.μ.)</FormLabel>
                          <FormControl><Input type="number" placeholder="π.χ., 500" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Τοποθεσία</FormLabel>
                          <FormControl><Input placeholder="π.χ., Κέντρο, Αθήνα" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="averageParkingRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Μέση Ωριαία Τιμή Στάθμευσης (€)</FormLabel>
                          <FormControl><Input type="number" step="0.1" placeholder="π.χ., 2.5" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupancyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Εκτιμώμενο Ποσοστό Πληρότητας (Ώρες Αιχμής)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="π.χ., 0.8 για 80%" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="peakHoursPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ώρες Αιχμής ανά Ημέρα</FormLabel>
                          <FormControl><Input type="number" placeholder="π.χ., 8" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg">
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                      Εκτίμηση Εσόδων
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="sticky top-24">
            <Card className="shadow-2xl rounded-lg">
              <CardHeader className="p-8">
                <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                  <TrendingUp className="text-primary h-8 w-8" /> Η Απόδοση της Επένδυσής σας (ROI)
                </CardTitle>
                <CardDescription>Τα εκτιμώμενα κέρδη σας θα εμφανιστούν εδώ.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center p-8 pt-0">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground mt-2">Υπολογισμός των κερδών σας...<br/>Η τεχνητή νοημοσύνη αναλύει τα δεδομένα.</p>
                  </div>
                ) : result ? (
                  <div className="w-full space-y-6 text-center">
                    <div>
                      <p className="text-lg text-muted-foreground">Εκτιμώμενα Μηνιαία Έσοδα</p>
                      <p className="text-4xl font-bold font-headline text-primary">€{result.estimatedMonthlyRevenue.toLocaleString('el-GR')}</p>
                    </div>
                     <div>
                      <p className="text-lg text-muted-foreground">Εκτιμώμενα Ετήσια Έσοδα</p>
                      <p className="text-5xl font-bold font-headline text-primary">€{result.estimatedAnnualRevenue.toLocaleString('el-GR')}</p>
                    </div>
                    <div className="pt-4 border-t mt-6">
                       <p className="text-md font-semibold mb-2">Σύσταση AI:</p>
                       <p className="text-muted-foreground italic text-md">"{result.recommendation}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Calculator className="h-16 w-16 mx-auto text-primary/30 mb-4"/>
                    <p className="text-lg">Συμπληρώστε τη φόρμα για να δείτε τα πιθανά σας έσοδα.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
