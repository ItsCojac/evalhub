import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  features: z.string().transform((str) => str.split('\n').filter(Boolean)),
  pricing: z.string().min(1, 'Pricing information is required'),
  logo: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
});

export const listSchema = z.object({
  title: z.string().min(1, 'List title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  categories: z.string().transform((str) => 
    str.split(',')
      .map(s => s.trim())
      .filter(Boolean)
  ),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
export type ListFormData = z.infer<typeof listSchema>;