import FooterBanner from "@/components/banner/FooterBanner";
import HeroBanner from "@/components/banner/HeroBanner";
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

      <div className="p-20 text-center">
        <h2 className="text-xl font-bold mb-2">Categories</h2>

        <div className="mb-20 rounded bg-black flex flex-row justify-around  items-center gap-10">
          {categories.map((category, index) => {
            return (
              <Link href={`/product?category=${category}`} key={index}>
                <h3 className="text-white hover:bg-slate-500">{category}</h3>
              </Link>
            );
          })}
        </div>

        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>

        <ProductsList products={featuredProducts} />
      </div>

      {/* <div className="categories">
        <h1>Categories</h1>
        <div className="category-list">
          {categories.map((category, index) => {
            return (
              <Link
                href={`/product?category=${category}`}
                className="category"
                key={index}
              >
                <h3>{category}</h3>
              </Link>
            );
          })}
        </div>
      </div> */}

      <FooterBanner footerBanner={bannerData} />
    </div>
  );
}
