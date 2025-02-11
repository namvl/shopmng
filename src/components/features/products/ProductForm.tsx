'use client'; // Mark as a Client Component

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the validation schema using Zod
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().min(0, 'Stock must be positive'),
  price: z.number().min(0, 'Price must be positive'),
});

// Infer the type for the form values from the schema
type ProductFormValues = z.infer<typeof productSchema>;

// Define the props for the ProductForm component
interface ProductFormProps {
  defaultValues?: ProductFormValues; // Optional default values for editing
  onSubmit: (data: ProductFormValues) => void; // Callback for form submission
}

export const ProductForm = ({ defaultValues, onSubmit }: ProductFormProps) => {
  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues, // Set default values if provided
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <Label>Name</Label>
        <Input {...register('name')} />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      {/* Name Field */}
      <div>
        <Label>SKU</Label>
        <Input {...register('sku')} />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      {/* Description Field */}
      <div>
        <Label>Description</Label>
        <Input {...register('description')} />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      {/* Stock Field */}
      <div>
        <Label>Stock</Label>
        <Input type="number" {...register('stock', { valueAsNumber: true })} />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      </div>

      {/* Price Field */}
      <div>
        <Label>Price</Label>
        <Input type="number" {...register('price', { valueAsNumber: true })} />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      </div>

      {/* Submit Button */}
      <Button type="submit">Save</Button>
    </form>
  );
};