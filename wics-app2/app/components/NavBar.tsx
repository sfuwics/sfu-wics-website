"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const newWidth: number = window.innerWidth;
    if (newWidth > 640) {
      setIsOpen(false);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (!navRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClick);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [pathname]);

  return (
    <div className="fixed left-0 top-0 z-[1000] w-full px-6 text-sm sm:px-12">
      <div
        ref={navRef}
        className={` ${
          isOpen ? "h-[20rem] rounded-3xl" : "h-[3rem] rounded-[24px]"
        } bg-main-100 z-[1000] mx-auto mt-4 flex max-w-[40rem] flex-col overflow-hidden border border-wics-blue-500 pt-1.5 px-8 transition-all duration-300 sm:pt-0 sm:flex-row sm:justify-between`}
      >
        <ul className={`flex w-full items-center sm:w-auto`}>
          <li className="ml-0.5 flex items-center">
            <Link href="/">
              <Logo className="h-8 w-12 sm:h-16" />
            </Link>
          </li>
          {/* hamburger and x buttons for nav toggle */}
          <li className="ml-auto flex items-center">
            <button className="relative ml-auto sm:hidden" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#24138E"
                className={`size-6 ${isOpen ? "hidden" : "flex"} `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#24138E"
                className={`size-6 ${isOpen ? "flex" : "hidden"} `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        </ul>

        {/* content box for nav links */}
        <div className="flex justify-center sm:justify-normal">
          <ul className="mt-8 flex flex-col items-center gap-6 text-base text-wics-blue-500 sm:mt-0 sm:flex-row sm:gap-4">
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline" href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link className="decoration-wics-yellow-500 decoration-2 hover:underline" href="/newsroom">
                Newsroom
              </Link>
            </li>
            <li>
              <Link className="decoration-wics-yellow-500 decoration-2 hover:underline" href="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="decoration-wics-yellow-500 decoration-2 hover:underline" href="/blog">
                WiCS Writes
              </Link>
            </li>
            <li>
              <Link className="decoration-wics-yellow-500 decoration-2 hover:underline" href="/sponsors">
                Sponsors
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}