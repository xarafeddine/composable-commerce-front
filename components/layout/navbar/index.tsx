import Link from "next/link";
import styles from "./navbar.module.scss";


export default async function Navbar() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Logo</h1>
      <input type="checkbox" id="nav-toggle" className={styles["nav-toggle"]} />
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={styles["nav-toggle-label"]}>
        <span></span>
      </label>
    </header>
  );
}
