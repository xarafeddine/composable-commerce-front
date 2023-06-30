import { useState, useEffect } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useProductsStore from "@/lib/store";
import { Product } from "@/lib/models";

type error = {
  name?: string;
  email?: string;
  address?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};

const CheckoutPage = () => {
  const {
    cart,

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

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<error>({});
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const { email, name } = session?.user || {};
    if (email && name) setCustomer({ ...customer, email, name });
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!payment.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    }

    if (!payment.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    }

    if (!payment.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      // submit order logic here
      router.push("/confirmation");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-cart-container">
        <h2>{totalQuantities} Items</h2>
      <div className="mt-5 ">

        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img
                src={item?.image}
                className="cart-item-image"
                alt={item?.title}
              />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${(item.price * item.quantity).toFixed(1)}</p>
              </div>
            </div>
          ))}
      </div>

        {/* Fake cart items */}

        <div className="cart-summary">
          <h1>Total: ${totalPrice}</h1>
        </div>
      </div>
      <div className="checkout-form">
        <h1 className="text-2xl font-bold text-center mb-10">Checkout</h1>
        <div className="customer-info">
          <h2 className="subtitle">Customer Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
            {errors?.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
            {errors?.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
        </div>
        <div className="payment-details">
          <h2 className="subtitle">Payment Details</h2>
          <div className="form-group">
            <label htmlFor="card-number">Card Number:</label>
            <div className="card-number-input">
              <input
                id="card-number"
                type="text"
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment({ ...payment, cardNumber: e.target.value })
                }
              />
              <div className="card-icons">
                <FaCcMastercard className="card-icon mastercard" />
                <FaCcVisa className="card-icon visa" />
              </div>
            </div>
            {errors?.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date:</label>
            <input
              id="expiry-date"
              type="text"
              value={payment.expiryDate}
              onChange={(e) =>
                setPayment({ ...payment, expiryDate: e.target.value })
              }
            />
            {errors?.expiryDate && <p className="error">{errors.expiryDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              id="cvv"
              type="text"
              value={payment.cvv}
              onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
            />
            {errors?.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
