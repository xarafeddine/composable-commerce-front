import Link from "next/link";
import styles from "./Navbar.module.css";
const Navbar = () => {
  // const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="bg-black text-white px-4 py-2 rounded font-bold text-2xl">
        <Link href="/">STORE</Link>
      </p>

      <ul className={styles.routes}>
        <li>
          <p className="active">
            <Link href="/products">Products</Link>
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

      {/* <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />} */}
    </div>
  );
};

export default Navbar;
