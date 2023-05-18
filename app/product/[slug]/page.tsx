import AddToCartBtn from "@/components/product/Cart/AddToCartBtn";
import Card from "@/components/product/card";
import { getProduct, getRelatedProducts } from "@/lib/client";
import Image from "next/image";
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
        <div className="w-fit">
          <div className="image-container">
            <Image
              width={500}
              height={500}
              src={product?.image}
              className="product-detail-image"
              alt={product?.title}
            />
          </div>
          <div className="small-images-container">
            {/* {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
          </div>
        </div>

        <div className="product-detail-desc w-fit">
          <h1>{product?.title}</h1>
          <div className="reviews">
            <div className="flex flex-row">
              {product?.rating
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <AiFillStar key={index} />)
                    .concat(
                      Array(5 - product?.rating).map((_, index) => (
                        <AiOutlineStar key={index + product?.rating} />
                      ))
                    )
                : "no review"}
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>

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
