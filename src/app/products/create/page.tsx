'use client';
import { ProductForm } from "@/components/features/products/ProductForm";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/productServices";

export default function CreateProductPage() {
    const router = useRouter();
  
    const handleSubmit = async (data: any) => {
      await createProduct(data);
      router.push('/');
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    );
  }