import { Product } from "@/lib/models";
import useProductsStore from "@/lib/store";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { TfiHeartBroken } from "react-icons/tfi";
import { TiDeleteOutline } from "react-icons/ti";

const Wishlist = () => {
  const { productsList, wishlist, setShowWishlist, removeFromWishlist } =
    useProductsStore((state) => state);

  const wishlistItems = wishlist.map((item) => {
    const { title, image, price, slug } = productsList.find(
      (prod: Product) => prod.id === item.productId
    ) as Product;

    return { ...item, title, image, price, slug };
  });

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowWishlist(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your wishlist</span>
          <span className="cart-num-items">({wishlist.length} items)</span>
        </button>

        {wishlistItems.length < 1 && (
          <div className="empty-cart">
            <TfiHeartBroken size={100} />
            <h3>Your wishlist is empty</h3>
          </div>
        )}

        <div className="product-container">
          {wishlistItems.length >= 1 &&
            wishlistItems.map((item) => (
              <div className="product items-center" key={item.productId}>
                <img
                  src={item?.image}
                  className="cart-product-image"
                  alt={item?.title}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>
                      <Link href={`/product/${item.slug}`}>{item.title}</Link>
                    </h5>
                    <h4 className="text-green-500">${item.price.toFixed(1)}</h4>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeFromWishlist(+item.productId)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                  <div className="flex bottom"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
