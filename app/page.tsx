import Card from "@/components/product/card";
import ProductsList from "@/components/product/list";
import { getProducts } from "@/lib/contentfull";
import { Product } from "@/lib/models";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="content">
        <h1>E-commerce platform</h1>
      </div>

      <h1 className="text-center mt-10">Our Products</h1>
      <ProductsList products={products} />
    </>
  );
}
