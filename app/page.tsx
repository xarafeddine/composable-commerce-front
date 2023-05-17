import FooterBanner from "@/components/banner/FooterBanner";
import HeroBanner from "@/components/banner/HeroBanner";
import ProductsList from "@/components/product/list";
import { getBanner, getProducts } from "@/lib/client";

export default async function Home() {
  const products = await getProducts();
  const bannerData = await getBanner();
  const featuredProducts = products.filter(
    (prod) => prod.category === "Featured Products"
  );
  return (
    <div className="py-20">
      <HeroBanner heroBanner={bannerData} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="p-20 text-center">
        <h2 className="text-xl font-bold mb-10">Featured Products</h2>
        <ProductsList products={featuredProducts} />
      </div>

      <FooterBanner footerBanner={bannerData} />
    </div>
  );
}
