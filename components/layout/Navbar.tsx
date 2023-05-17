"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { AiOutlineShopping } from "react-icons/ai";
import useProductsStore from "@/lib/store";
import Cart from "../product/Cart";
const Navbar = () => {
  const { showCart, setShowCart, getTotalQuantities } = useProductsStore();

  return (
    <div className="navbar-container">
      <p className="bg-black text-white px-4 py-2 rounded font-bold text-2xl">
        <Link href="/">STORE</Link>
      </p>

      <ul className={styles.routes}>
        <li>
          <p className="active">
            <Link href="/product">Products</Link>
          </p>
        </li>

        <li>
          <p className="">
            <Link href="/about">About</Link>
          </p>
        </li>

        <li>
          <p className="">
            <Link href="/contact">Contact</Link>
          </p>
        </li>
      </ul>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{getTotalQuantities()}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
