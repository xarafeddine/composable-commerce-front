import AddToCartBtn from "@/components/product/Cart/AddToCartBtn";
import ImageHandler from "@/components/product/ImageHandler";
import Card from "@/components/product/card";
import { getRelatedProducts } from "@/lib/client";
import useProductsStore from "@/lib/store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = () => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, getProduct } = useProductsStore(
    (state) => state
  );
  const slug = router.query.slug as string;
  const product = getProduct(slug);
  if (!product) return "product not found";

  const relatedProducts = getRelatedProducts(product.category);
  console.log("this product isin wishlist", product.isInWishlist);
  return (
    <div>
      <div className="product-detail-container">
        <ImageHandler product={product} />

        <div className="product-detail-desc w-fit">
          <h1 className="font-bold text-4xl mb-5">{product?.title}</h1>

          <h4 className="font-bold">Rating: </h4>
          <div className="reviews">
            <div className="flex flex-row items-center">
              {product?.rating
                ? Array(Math.round(product?.rating.rate))
                    .fill(0)
                    .map((_, index) => <AiFillStar key={index} />)
                    .concat(
                      Array(5 - Math.round(product?.rating.rate))
                        .fill(0)
                        .map((_, index) => (
                          <AiOutlineStar key={index + product?.rating?.rate!} />
                        ))
                    )
                : "no review"}
              <span className="ml-2 text-black ">
                ({product.rating?.count})
              </span>
            </div>
          </div>

          <p className="price">${product.price}</p>

          <h4 className="font-bold">Details: </h4>
          <p>{product.details}</p>
          <div className="flex flex-row gap-10 items-center ">
            <AddToCartBtn productId={+product.id} />
            <div className="mt-10">
              {product.isInWishlist ? (
                <AiFillHeart
                  onClick={() => {
                    removeFromWishlist(+product.id);
                    toast.remove("removed from wishlist");
                  }}
                  size={50}
                  color="red"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => {
                    addToWishlist(+product.id);
                    toast.success("Added to cart");
                  }}
                  size={50}
                />
              )}
            </div>
          </div>
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

export default ProductDetails;
