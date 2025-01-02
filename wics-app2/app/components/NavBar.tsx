import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="bg-white px-6 py-4 font-robot-slab shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Logo className="h-16 w-16 sm:h-24 sm:w-24" />
        </Link>

        <div className="flex items-center gap-5 text-black text-base">
          {/* <nav className="flex flex-col items-center space-y-4 text-2xl "> */}
            <Link href="/about">About</Link>
            <Link href="/events">Events</Link>
            <Link href="/blog">Blog</Link>
          {/* </nav> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
