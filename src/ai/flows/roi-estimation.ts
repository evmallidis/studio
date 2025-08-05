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
    .describe("The type of parking space: 'Outdoor', 'Covered', 'Multi-story'."),
  spaceSizeSqFt: z.number().describe('The size of the space in square feet.'),
  location: z.string().describe('The location of the space.'),
  averageParkingRate: z
    .number()
    .describe('The average hourly parking rate in the area.'),
  occupancyRate: z
    .number()
    .describe(
      'The estimated average occupancy rate of the parking space during peak hours (as a decimal, e.g., 0.8 for 80%).'
    ),
  peakHoursPerDay: z
    .number()
    .describe('The number of peak hours per day the parking space is likely to be occupied.'),
});
export type RoiEstimationInput = z.infer<typeof RoiEstimationInputSchema>;

const RoiEstimationOutputSchema = z.object({
  estimatedMonthlyRevenue: z
    .number()
    .describe('The estimated monthly revenue from the parking space.'),
  estimatedAnnualRevenue: z
    .number()
    .describe('The estimated annual revenue from the parking space.'),
  recommendation: z
    .string()
    .describe(
      'A recommendation on whether to proceed with converting the space into a parking facility, based on the estimated ROI.'
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
  prompt: `You are an expert in parking facility ROI estimation.

You will use the following information to estimate the potential revenue of converting a space into a parking facility, and provide a recommendation on whether to proceed.

Space Type: {{{spaceType}}}
Space Size (Sq Ft): {{{spaceSizeSqFt}}}
Location: {{{location}}}
Average Parking Rate (Hourly): {{{averageParkingRate}}}
Occupancy Rate (Peak Hours): {{{occupancyRate}}}
Peak Hours Per Day: {{{peakHoursPerDay}}}

Based on this information, calculate the estimated monthly and annual revenue, and provide a recommendation.

Consider factors such as location, space type, and occupancy rate when making your recommendation.

Ensure all calculations are accurate and the recommendation is well-justified.`,
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
