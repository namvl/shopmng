import { fetchProductById } from '@/services/productServices';
import EditProductClient from './EditProductClient';

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const p = await fetchProductById((await params).id);
  return <EditProductClient product={p} id={p.id} />;
}