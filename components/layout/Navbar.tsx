"use client";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import useProductsStore from "@/lib/store";
import Cart from "../product/Cart";
import SearchIcon from "../icons/search";
import { useSession } from "next-auth/react";
import { SignInButton, SignOutButton } from "../auth/buttons";

const Navbar = () => {
  const { showCart, setShowCart, getTotalQuantities } = useProductsStore();
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="navbar-container">
      <ul className="flex felx-row gap-6 justify-center items-center ">
        <li className="hover:font-bold">
          <Link href="/">
            <img
              className="hover:scale-105"
              src="/icon-192x192.png"
              width={50}
            />
          </Link>
          {/* <Link href="/">HOME</Link> */}
        </li>

        <li className="hover:font-bold">
          <Link href="/product">All Products</Link>
        </li>
      </ul>

      <form
        // onSubmit={onSubmit}
        className="relative m-0 flex w-1/3 items-center border border-gray-200 bg-transparent p-0 dark:border-gray-500"
      >
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          className="w-full px-4 py-2 text-black"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <SearchIcon className="h-5" />
        </div>
      </form>

      <div className="flex flex-row gap-4">
        {/* <Link href="/login">
          <BiLogIn size="25px" color="gray" />
        </Link> */}

        <SignInButton>
          <BiLogIn size="25px" color="black" />
        </SignInButton>

        {status === "authenticated" && (
          <SignOutButton>
            <BiLogOut size="25px" color="red" />
          </SignOutButton>
        )}

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
    </div>
  );
};

export default Navbar;
