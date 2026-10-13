"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname?.startsWith(href);

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
          isOpen ? "h-[20rem] rounded-3xl" : "h-[3rem] rounded-[15px]"
        } z-[1000] mx-auto mt-8 flex max-w-[40rem] flex-col overflow-hidden border border-wics-blue-500 bg-main-100 px-5 pt-2 transition-all duration-300 sm:flex-row sm:justify-between sm:pt-0`}
      >
        <ul className={`flex w-full items-center sm:w-auto`}>
          <li className=" flex items-center">
            <Link href="/" aria-label="SFU WiCS home">
              <div className="relative h-[32px] w-[48px] sm:h-[40px] sm:w-[60px]">
                    <Logo className="h-full w-full" />
              </div>
            </Link>
          </li>
          {/* hamburger and x buttons for nav toggle */}
          <li className="ml-auto flex items-center">
            <button
              className="relative h-4 w-6 sm:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="nav-links"
            >
              <div className="relative h-full w-full">
                {/* Top bar */}
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-wics-blue-500 transition-all duration-300 ${
                    isOpen
                      ? "top-1/2 w-full -translate-y-1/2 rotate-45"
                      : "top-0 w-full"
                  }`}
                ></span>

                {/* Middle bar */}
                <span
                  className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 bg-wics-blue-500 transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>

                {/* Bottom bar */}
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-wics-blue-500 transition-all duration-300 ${
                    isOpen
                      ? "top-1/2 w-full -translate-y-1/2 -rotate-45"
                      : "bottom-0 w-full"
                  }`}
                ></span>
              </div>
            </button>
          </li>
        </ul>

        {/* content box for nav links */}
        {/* Hidden links stay out of the tab order on mobile; the visibility
            transition keeps them visible until the close animation ends */}
        <div
          id="nav-links"
          className={`flex justify-center transition-[visibility] duration-300 sm:visible sm:justify-normal ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          <ul className="mt-8 flex flex-col items-center gap-6 text-base text-wics-blue-500 sm:mt-0 sm:flex-row sm:gap-4">
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline"
                href="/about"
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline"
                href="/newsroom"
                aria-current={isActive("/newsroom") ? "page" : undefined}
              >
                Newsroom
              </Link>
            </li>
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline"
                href="/events"
                aria-current={isActive("/events") ? "page" : undefined}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline"
                href="/blog"
                aria-current={isActive("/blog") ? "page" : undefined}
              >
                WiCS Writes
              </Link>
            </li>
            <li>
              <Link
                className="decoration-wics-yellow-500 decoration-2 hover:underline"
                href="/sponsors"
                aria-current={isActive("/sponsors") ? "page" : undefined}
              >
                Sponsors
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
