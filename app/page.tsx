import FooterBanner from "@/components/banner/FooterBanner";
import HeroBanner from "@/components/banner/HeroBanner";
import Card from "@/components/product/card";
import ProductsList from "@/components/product/list";
import { getBanner, getCategories, getProducts } from "@/lib/client";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const categories = getCategories();
  const bannerData = await getBanner();
  const featuredProducts = products.filter(
    (prod) => prod.category === "Featured Products"
  );
  return (
    <div className="py-20 px-5">
      <HeroBanner heroBanner={bannerData} />

      <div className="p-10 text-center">
        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>

        <ProductsList products={featuredProducts} />
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>

      <FooterBanner footerBanner={bannerData} />
    </div>
  );
}
