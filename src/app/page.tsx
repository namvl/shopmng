'use client';
import { Button } from "@/components/ui/button";
import { ProductList } from "@/components/features/products/ProductList";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const handleNewProduct = () => {
    route.push("/create");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div>
        <Button onClick={handleNewProduct}>New Product</Button>
      </div>
      <ProductList />
    </div>
  );
}