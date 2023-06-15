import Link from "next/link";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from "react-icons/ai";
import InstallBtn from "../PWA/InstallBtn";

const Footer = () => {
  return (
    <footer className="m-0 max-w-[1920px] px-20 bg-zinc-900">
      <div className="grid grid-cols-1 pl-0.5 lg:grid-cols-12 gap-8 border-b border-zinc-600 py-12 text-white transition-colors duration-150 bg-zinc-900">
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/about"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                About
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/contact"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Contact us
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/help"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-white font-bold hover:text-zinc-200 transition ease-in-out duration-150">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white hover:text-zinc-200 transition ease-in-out duration-150"
              >
                Terms of Use
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <InstallBtn />
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-white">
          <div className="flex space-x-6 items-center h-10">
            <AiFillInstagram />
            <AiOutlineTwitter />
            <AiOutlineFacebook />
            <AiOutlineLinkedin />
          </div>
        </div>
      </div>
      <div className="py-12 flex flex-col justify-between items-center space-y-4 bg-zinc-900">
        <div>
          <span className="text-white">
            &copy; 2023 XARAF, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
