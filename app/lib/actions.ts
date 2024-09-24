'use server';

import { z } from 'zod';

const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['paid', 'pending']),
    date: z.string(),
});

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    /**
     * OR you can do this:
     * const { customerId, amount, status } = CreateInvoice.parse(Object.fromEntries(formData.entries()));
     */

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    console.table({ customerId, amount, status });
}
