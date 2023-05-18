"use client";

import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import useProductsStore from "@/lib/store";

import { Product } from "@/lib/models";
import QtyHandler from "./QtyHandler";

// import getStripe from "../lib/getStripe";

const Cart = () => {
  const {
    setShowCart,
    cart,
    removeFromCart,
    getTotalQuantities,
    productsList,
  } = useProductsStore((state) => state);

  const totalQuantities = getTotalQuantities();

  const cartItems = cart.sort().map((item) => {
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
    // const stripe = await getStripe();
    // const response = await fetch("/api/stripe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(cartItems),
    // });
    // if (response.statusCode === 500) return;
    // const data = await response.json();
    // toast.loading("Redirecting...");
    // stripe.redirectToCheckout({ sessionId: data.id });
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
            <AiOutlineShopping size={150} />
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
                <img src={item?.image} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.title}</h5>
                    <h4>${item.price * item.quantity}</h4>
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
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
