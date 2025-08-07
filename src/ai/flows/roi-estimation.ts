// ROI Estimation Genkit flow
'use server';

/**
 * @fileOverview An AI agent for estimating the ROI of converting a space into a parking facility.
 *
 * - estimateRoi - A function that estimates the potential ROI.
 * - RoiEstimationInput - The input type for the estimateRoi function.
 * - RoiEstimationOutput - The return type for the estimateRoi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoiEstimationInputSchema = z.object({
  spaceType: z
    .string()
    .describe("Ο τύπος του χώρου στάθμευσης: 'Υπαίθριος', 'Στεγασμένος', 'Πολυώροφος'."),
  spaceSizeSqFt: z.number().describe('Το μέγεθος του χώρου σε τετραγωνικά μέτρα.'),
  location: z.string().describe('Η τοποθεσία του χώρου.'),
  averageParkingRate: z
    .number()
    .describe('Η μέση ωριαία τιμή στάθμευσης στην περιοχή.'),
  occupancyRate: z
    .number()
    .describe(
      'Το εκτιμώμενο μέσο ποσοστό πληρότητας του χώρου στάθμευσης κατά τις ώρες αιχμής (ως δεκαδικός, π.χ., 0.8 για 80%).'
    ),
  peakHoursPerDay: z
    .number()
    .describe('Ο αριθμός των ωρών αιχμής ανά ημέρα που ο χώρος στάθμευσης είναι πιθανό να είναι κατειλημμένος.'),
});
export type RoiEstimationInput = z.infer<typeof RoiEstimationInputSchema>;

const RoiEstimationOutputSchema = z.object({
  estimatedMonthlyRevenue: z
    .number()
    .describe('Τα εκτιμώμενα μηνιαία έσοδα από τον χώρο στάθμευσης.'),
  estimatedAnnualRevenue: z
    .number()
    .describe('Τα εκτιμώμενα ετήσια έσοδα από τον χώρο στάθμευσης.'),
  recommendation: z
    .string()
    .describe(
      'Μια σύσταση για το αν πρέπει να προχωρήσετε με τη μετατροπή του χώρου σε εγκατάσταση στάθμευσης, βασισμένη στην εκτιμώμενη απόδοση επένδυσης (ROI). Η απάντηση πρέπει να είναι στα Ελληνικά.'
    ),
});
export type RoiEstimationOutput = z.infer<typeof RoiEstimationOutputSchema>;

export async function estimateRoi(input: RoiEstimationInput): Promise<RoiEstimationOutput> {
  return roiEstimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roiEstimationPrompt',
  input: {schema: RoiEstimationInputSchema},
  output: {schema: RoiEstimationOutputSchema},
  prompt: `Είστε ειδικός στην εκτίμηση της απόδοσης επένδυσης (ROI) για εγκαταστάσεις στάθμευσης.

Θα χρησιμοποιήσετε τις παρακάτω πληροφορίες για να εκτιμήσετε τα πιθανά έσοδα από τη μετατροπή ενός χώρου σε εγκατάσταση στάθμευσης και θα παρέχετε μια σύσταση για το αν πρέπει να προχωρήσετε.

Τύπος Χώρου: {{{spaceType}}}
Μέγεθος Χώρου (τ.μ.): {{{spaceSizeSqFt}}}
Τοποθεσία: {{{location}}}
Μέση Ωριαία Τιμή Στάθμευσης: {{{averageParkingRate}}}
Ποσοστό Πληρότητας (Ώρες Αιχμής): {{{occupancyRate}}}
Ώρες Αιχμής ανά Ημέρα: {{{peakHoursPerDay}}}

Με βάση αυτές τις πληροφορίες, υπολογίστε τα εκτιμώμενα μηνιαία και ετήσια έσοδα και δώστε μια σύσταση. Η απάντησή σας πρέπει να είναι στα Ελληνικά.

Λάβετε υπόψη παράγοντες όπως η τοποθεσία, ο τύπος του χώρου και το ποσοστό πληρότητας κατά τη διαμόρφωση της σύστασής σας.

Βεβαιωθείτε ότι όλοι οι υπολογισμοί είναι ακριβείς και η σύσταση είναι καλά τεκμηριωμένη.`,
});

const roiEstimationFlow = ai.defineFlow(
  {
    name: 'roiEstimationFlow',
    inputSchema: RoiEstimationInputSchema,
    outputSchema: RoiEstimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
