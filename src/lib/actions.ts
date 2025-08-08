'use server';

import { estimateRoi, RoiEstimationInput, RoiEstimationOutput } from '@/ai/flows/roi-estimation';
import { verifyRecaptcha, RecaptchaResponse } from '@/lib/recaptcha';
import { z } from 'zod';

export async function getRoiEstimation(
  input: RoiEstimationInput & { recaptchaToken: string }
): Promise<{ success: boolean; data?: RoiEstimationOutput; error?: string }> {
  try {
    const recaptchaResult: RecaptchaResponse = await verifyRecaptcha(input.recaptchaToken);
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return { success: false, error: 'reCAPTCHA verification failed.' };
    }

    const result = await estimateRoi(input);
    return { success: true, data: result };
  } catch (e: any) {
    console.error(e);
    return { success: false, error: e.message || 'An unknown error occurred.' };
  }
}

const QuoteFormSchema = z.object({
  municipality: z.string().min(1, 'Ο Δήμος είναι υποχρεωτικός.'),
  propertyType: z.string().min(1, 'Παρακαλώ επιλέξτε τύπο ακινήτου.'),
  totalArea: z.coerce.number().min(1, 'Η συνολική έκταση είναι υποχρεωτική.'),
  area: z.string().min(1, 'Η περιοχή είναι υποχρεωτική.'),
  collaborationType: z.string().min(1, 'Παρακαλώ επιλέξτε τύπο συνεργασίας.'),
  email: z.string().email('Μη έγκυρη διεύθυνση email.'),
  comments: z.string().optional(),
});

type QuoteFormData = z.infer<typeof QuoteFormSchema>;


export async function submitQuoteForm(
  input: QuoteFormData & { recaptchaToken: string }
): Promise<{ success: boolean; message: string }> {
   try {
    const recaptchaResult: RecaptchaResponse = await verifyRecaptcha(input.recaptchaToken);
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return { success: false, message: 'reCAPTCHA verification failed.' };
    }

    console.log('Quote form submitted successfully:', input);

    return { success: true, message: 'Σας ευχαριστούμε για το ενδιαφέρον σας. Θα επικοινωνήσουμε μαζί σας σύντομα.' };
  } catch (e: any) {
    console.error(e);
    return { success: false, message: e.message || 'An unknown error occurred.' };
  }
}
