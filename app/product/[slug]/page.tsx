import AddToCartBtn from "@/components/product/Cart/AddToCartBtn";
import ImageHandler from "@/components/product/ImageHandler";
import Card from "@/components/product/card";
import { getProduct, getRelatedProducts } from "@/lib/client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "all";

const productDetails = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await getProduct(slug);
  if (!product) return "product not found";

  const relatedProducts = getRelatedProducts(product.category);
  return (
    <div>
      <div className="product-detail-container">
        <ImageHandler product={product} />

        <div className="product-detail-desc w-fit">
          <h1 className="font-bold text-4xl">{product?.title}</h1>
          <div className="reviews">
            <div className="flex flex-row">
              {product?.rating
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <AiFillStar key={index} />)
                    .concat(
                      Array(5 - Math.floor(Math.random()*5)).map((_, index) => (
                        <AiOutlineStar key={index + product?.rating} />
                      ))
                    )
                : "no review"}
            </div>
            <p>(20)</p>
          </div>
          <p className="price">${product.price}</p>

          <h4 className="font-bold">Details: </h4>
          <p>{product.details}</p>
          <AddToCartBtn productId={product.id} />
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {relatedProducts.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default productDetails;
