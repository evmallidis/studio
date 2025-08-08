'use server';

export interface RecaptchaResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
    'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        throw new Error('RECAPTCHA_SECRET_KEY is not set');
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    try {
        const response = await fetch(verificationUrl, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`reCAPTCHA verification request failed with status: ${response.status}`);
        }

        const data: RecaptchaResponse = await response.json();
        return data;

    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        throw error;
    }
}
