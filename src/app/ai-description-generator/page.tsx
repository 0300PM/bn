'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  competitorListing1: z.string().url({ message: 'Proszę podać prawidłowy adres URL.' }),
  competitorListing2: z.string().url({ message: 'Proszę podać prawidłowy adres URL.' }),
});

export default function AiDescriptionGeneratorPage() {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competitorListing1: '',
      competitorListing2: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateProductDescription(values);
      setGeneratedDescription(result.productDescription);
    } catch (error) {
      console.error('Error generating product description:', error);
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: 'Nie udało się wygenerować opisu produktu. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">AI Product Description Generator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Summarize features from competitor listings into a unique product description.
        </p>
      </div>
      
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Competitor Product Listings</CardTitle>
              <CardDescription>
                Enter the URLs of two competing products to analyze and generate a new description.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="competitorListing1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitor URL 1</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/product-a" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitorListing2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitor URL 2</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/product-b" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-6">
                <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Description
              </Button>

              {generatedDescription && (
                <>
                <Separator />
                <div className="w-full space-y-2">
                    <h3 className="text-lg font-semibold">Generated Description:</h3>
                    <Textarea
                        readOnly
                        value={generatedDescription}
                        className="min-h-[150px] bg-muted/50"
                    />
                </div>
                </>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
