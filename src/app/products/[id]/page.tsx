import * as React from 'react'
import { fetchProductById } from '@/services/productServices';
import { ProductDetail } from '@/components/features/products/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <ProductDetail product={product} />
    </div>
  );
}