'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  municipality: z.string().min(1, 'Municipality is required.'),
  propertyType: z.string().min(1, 'Please select a property type.'),
  totalArea: z.string().min(1, 'Total area is required.'),
  area: z.string().min(1, 'Area is required.'),
  collaborationType: z.string().min(1, 'Please select a collaboration type.'),
  email: z.string().email('Invalid email address.'),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      municipality: '',
      propertyType: '',
      totalArea: '',
      area: '',
      collaborationType: '',
      email: '',
      comments: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    // Here you would typically send the form data to your backend
    console.log(values);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast({
      title: 'Form Submitted!',
      description: 'Thank you for your interest. We will get back to you shortly.',
    });
    form.reset();
  }

  return (
    <section id="quote-form" className="py-12 md:py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Request a Quote</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
              Interested in our services? Fill out the form below to get a personalized quote.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="municipality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Municipality</FormLabel>
                          <FormControl><Input placeholder="e.g., Athens" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area</FormLabel>
                          <FormControl><Input placeholder="e.g., Kolonaki" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select property type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Parking in operation">Parking in operation</SelectItem>
                              <SelectItem value="Outdoor space">Outdoor space</SelectItem>
                              <SelectItem value="Indoor space">Indoor space</SelectItem>
                              <SelectItem value="Undeveloped space">Undeveloped space</SelectItem>
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
                          <FormLabel>Collaboration Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select collaboration type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Lease">Lease</SelectItem>
                              <SelectItem value="Configuration">Configuration</SelectItem>
                              <SelectItem value="Organization">Organization</SelectItem>
                              <SelectItem value="Management">Management</SelectItem>
                              <SelectItem value="Equipment">Equipment</SelectItem>
                              <SelectItem value="Staffing">Staffing</SelectItem>
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
                          <FormLabel>Total Area (sq. m.)</FormLabel>
                          <FormControl><Input type="text" placeholder="e.g., 2000" {...field} /></FormControl>
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
                        <FormLabel>Comments & Phone Number</FormLabel>
                        <FormControl><Textarea placeholder="Leave your comments and a contact phone number here..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit
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
