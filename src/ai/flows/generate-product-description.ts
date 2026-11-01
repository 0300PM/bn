'use server';

/**
 * @fileOverview Generates a product description by summarizing features from competitor product listings.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  competitorListing1: z
    .string()
    .url()
    .describe('URL of the first competitor product listing.'),
  competitorListing2: z
    .string()
    .url()
    .describe('URL of the second competitor product listing.'),
});

export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  productDescription: z
    .string()
    .describe('A compelling product description summarizing unique features.'),
});

export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const compareProductsTool = ai.defineTool({
  name: 'compareProducts',
  description: 'Compares two product listings and presents the highlights of each item.',
  inputSchema: z.object({
    listing1: z.string().describe('The first product listing to compare.'),
    listing2: z.string().describe('The second product listing to compare.'),
  }),
  outputSchema: z.string(),
},
async (input) => {
  // In a real implementation, this would fetch the content from the URLs,
  // parse the product information, and compare the features.
  // For this example, we'll just return a placeholder.
  return `Comparison of ${input.listing1} and ${input.listing2}: This is a placeholder comparison.  A real implementation would fetch and compare product details.`;
});

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  tools: [compareProductsTool],
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce product descriptions.

  Using the provided URLs for competitor product listings, create a compelling product description that highlights the unique features and benefits of our product.

  Consider the key selling points of each product and craft a description that is both informative and persuasive.

  Use the compareProducts tool to understand the highlights of each product.

  The first listing is {{{competitorListing1}}}.
  The second listing is {{{competitorListing2}}}.
  Product Description:`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
