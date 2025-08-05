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
  spaceType: z.enum(['Outdoor', 'Covered', 'Multi-story'], { required_error: 'Please select a space type.' }),
  spaceSizeSqFt: z.coerce.number().min(100, 'Space must be at least 100 sq ft.'),
  location: z.string().min(3, 'Location is required.'),
  averageParkingRate: z.coerce.number().min(0.1, 'Rate must be positive.'),
  occupancyRate: z.coerce.number().min(0.01, 'Rate must be between 0.01 and 1.').max(1, 'Rate must be between 0.01 and 1.'),
  peakHoursPerDay: z.coerce.number().min(1, 'Hours must be between 1 and 24.').max(24, 'Hours must be between 1 and 24.'),
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
        title: 'Error',
        description: response.error || 'Failed to estimate ROI. Please try again.',
      });
    }
  }

  return (
    <section id="roi-calculator" className="py-12 md:py-24 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Free ROI Estimation</h2>
            <p className="max-w-2xl mt-4 text-muted-foreground md:text-lg">
              Use our AI-powered tool to get an instant estimate of your potential parking revenue. Just fill in the details about your space.
            </p>
            <Card className="mt-8">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="spaceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Space Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select space type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Outdoor">Outdoor</SelectItem>
                              <SelectItem value="Covered">Covered / Underground</SelectItem>
                              <SelectItem value="Multi-story">Multi-story Building</SelectItem>
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
                          <FormLabel>Space Size (sq ft)</FormLabel>
                          <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl><Input placeholder="e.g., Downtown, Athens" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="averageParkingRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Hourly Parking Rate (€)</FormLabel>
                          <FormControl><Input type="number" step="0.1" placeholder="e.g., 2.5" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupancyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Occupancy Rate (Peak Hours)</FormLabel>
                          <FormControl><Input type="number" step="0.01" placeholder="e.g., 0.8 for 80%" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="peakHoursPerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peak Hours per Day</FormLabel>
                          <FormControl><Input type="number" placeholder="e.g., 8" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
                      Estimate Revenue
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="sticky top-24">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <TrendingUp className="text-primary" /> Your Potential ROI
                </CardTitle>
                <CardDescription>Your estimated earnings will appear here.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[250px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Calculating your earnings...</p>
                  </div>
                ) : result ? (
                  <div className="w-full space-y-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Monthly Revenue</p>
                      <p className="text-4xl font-bold font-headline text-primary">€{result.estimatedMonthlyRevenue.toLocaleString()}</p>
                    </div>
                     <div>
                      <p className="text-sm text-muted-foreground">Estimated Annual Revenue</p>
                      <p className="text-5xl font-bold font-headline text-primary">€{result.estimatedAnnualRevenue.toLocaleString()}</p>
                    </div>
                    <div className="pt-4">
                       <p className="text-sm font-semibold">AI Recommendation:</p>
                       <p className="text-muted-foreground italic">"{result.recommendation}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Fill out the form to see your potential revenue.</p>
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
