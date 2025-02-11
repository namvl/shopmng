"use client";

import { ProductForm } from "@/components/features/products/ProductForm";
import { updateProduct } from "@/services/productServices";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface EditProductClientProps {
    product: Product;
    id: string;
}
export default function EditProductClient(
    { product, id }: EditProductClientProps
) {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        await updateProduct(id, data);
        router.push('/products');
    };
    const handleCancel = () => {
        router.push('/products')
    }

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <ProductForm defaultValues={product} onSubmit={handleSubmit} />
            <Button onClick={handleCancel}>Cancel</Button>
        </div>
    );
};