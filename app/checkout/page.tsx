"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "p43kjh534kh54k3",
    expiryDate: "03/04",
    cvv: "324",
  });
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const { email, name } = session?.user!;
    setCustomer({ ...customer, email, name });
  }, []);

  const handleSubmit = () => {
    // submit order logic here
    router.push("/confirmation");
  };

  return (
    <div className="checkout-page">
      <h1 className="text-2xl font-bold text-center mb-10 ">Checkout</h1>
      <div className="customer-info">
        <h2 className="subtitle">Customer Information</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
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
        </div>
      </div>
      <div className="payment-details">
        <h2 className="subtitle">Payment Details</h2>
        <div className="form-group">
          <label htmlFor="card-number">Card Number:</label>
          <input
            id="card-number"
            type="text"
            value={payment.cardNumber}
            onChange={(e) =>
              setPayment({ ...payment, cardNumber: e.target.value })
            }
          />
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
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            id="cvv"
            type="text"
            value={payment.cvv}
            onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
          />
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
};

export default CheckoutPage;
