import Card from "@/components/product/card";
import { getProducts } from "@/lib/contentfull";
import { Product } from "@/lib/models";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-6xl mb-10 ">Store</h1>
        <main>
          <div className="flex gap-5 m-10">
            {products.map(({ fields }: Product) => {
              if (fields.image) {
                return <Card key={fields.id} product={fields} />;
              }
            })}
          </div>
        </main>
      </div>
    </>
  );
}
