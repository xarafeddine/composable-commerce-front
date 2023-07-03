"use client";

import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import useProductsStore from "@/lib/store";

import { Product } from "@/lib/models";
import QtyHandler from "./QtyHandler";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import getStripe from "../lib/getStripe";

const Cart = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    setShowCart,
    cart,
    removeFromCart,
    getTotalQuantities,
    productsList,
  } = useProductsStore((state) => state);

  const totalQuantities = getTotalQuantities();

  const cartItems = cart
    .sort((a, b) => a.productId - b.productId)
    .map((item) => {
      const { title, image, price } = productsList.find(
        (prod: Product) => prod.id === item.productId
      ) as Product;

      return { ...item, title, image, price };
    });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setShowCart(false);
    if (status === "authenticated") {
      return router.push("/checkout");
    }
    return toast.error("you are not authenticated");
  };
  console.log(cart);

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={100} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item.productId}>
                <img
                  src={item?.image}
                  className="cart-product-image"
                  alt={item?.title}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.title}</h5>
                    <h4 className="text-green-900">
                      ${(item.price * item.quantity).toFixed(1)}
                    </h4>
                  </div>
                  <div className="flex bottom">
                    {/* <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={
                            () =>
                              updateCart({
                                ...item,
                                quantity: item.quantity - 1,
                              })
                            // toggleCartItemQuanitity(item.productId, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={
                            () =>
                              updateCart({
                                ...item,
                                quantity: item.quantity + 1,
                              })

                            // toggleCartItemQuanitity(item.productId, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div> */}
                    <QtyHandler
                      item={{
                        productId: item.productId,
                        quantity: item.quantity,
                      }}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3 className="text-green-500">${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
