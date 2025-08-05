'use server';

import { estimateRoi, RoiEstimationInput, RoiEstimationOutput } from '@/ai/flows/roi-estimation';

export async function getRoiEstimation(
  input: RoiEstimationInput
): Promise<{ success: boolean; data?: RoiEstimationOutput; error?: string }> {
  try {
    const result = await estimateRoi(input);
    return { success: true, data: result };
  } catch (e: any) {
    console.error(e);
    return { success: false, error: e.message || 'An unknown error occurred.' };
  }
}
