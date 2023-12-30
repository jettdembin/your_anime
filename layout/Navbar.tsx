"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContentContainer } from "./ContentContainer";
import UserNavigation from "./Navbar/UserNavigation";

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const pathname = usePathname();

  // Set initial opacity based on whether the pathname includes "anime-details"
  const initialOpacity = pathname?.includes("anime-details")
    ? "bg-opacity-80"
    : "bg-opacity-100";
  const [navbarOpacity, setNavbarOpacity] = useState(initialOpacity);

  useEffect(() => {
    const handleScroll = (): void => {
      const st: number =
        window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTopRef.current) {
        navbarRef.current?.classList.remove("translate-y-0", "duration-150");
        navbarRef.current?.classList.add("-translate-y-full", "duration-150");
      } else {
        navbarRef.current?.classList.remove(
          "-translate-y-full",
          "duration-150"
        );
        navbarRef.current?.classList.add("translate-y-0", "duration-150");
      }

      lastScrollTopRef.current = st;

      if (pathname?.includes("anime-details") && st <= 0) {
        setNavbarOpacity("bg-opacity-80");
      } else {
        setNavbarOpacity("bg-opacity-100");
      }
    };

    // Update opacity immediately when pathname changes
    if (pathname?.includes("anime-details")) {
      setNavbarOpacity("bg-opacity-80");
    } else {
      setNavbarOpacity("bg-opacity-100");
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <nav
      ref={navbarRef}
      className={`w-full p-6 bg-gray-800 ${navbarOpacity} fixed top-0 z-50 flex items-center justify-center`}
      id="navbar"
    >
      <ContentContainer>
        <ul className="flex justify-between lg:gap-6 text-gray-100">
          <Link href={`/`}>
            <li className="my-auto font-medium cursor-pointer">YAnime</li>
          </Link>
          <div className="flex gap-2 lg:gap-10">
            <li className="my-auto font-medium cursor-pointer">Search</li>
            <li className="my-auto font-medium cursor-pointer">Social</li>
            <li className="my-auto font-medium cursor-pointer">Forum</li>
          </div>
          <div className="flex lg:gap-4">
            <UserNavigation />
          </div>
        </ul>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
