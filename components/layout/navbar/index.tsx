import Link from "next/link";
import { Suspense } from "react";

const li_style = "text-xl font-bold";
export default async function Navbar() {
  return (
    <ul className="w-full bg-blue-950 flex flex-row gap-10 p-10 justify-center">
      <li className={li_style}>
        <Link href="/">home</Link>
      </li>
      <li className={li_style}>
        <Link href="/products">products</Link>
      </li>
      <li className={li_style}>
        <Link href="/about">about</Link>
      </li>
    </ul>
  );
}
