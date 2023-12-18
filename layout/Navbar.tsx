"use client";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import UserNavigation from "./Navbar/UserNavigation";
import { ContentContainer } from "./ContentContainer";
import useClickOutside from "@/hooks/useClickOutside";

export default function Navbar() {
  // Change here: Specify that navbarRef is a reference to an HTMLDivElement
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  function handleScroll() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTopRef.current) {
      // When hiding the navbar
      navbarRef.current?.classList.remove("translate-y-0", "duration-150");
      navbarRef.current?.classList.add("-translate-y-full", "duration-150");
    } else {
      // When showing the navbar
      navbarRef.current?.classList.remove("-translate-y-full", "duration-150");
      navbarRef.current?.classList.add("translate-y-0", "duration-150");
    }
    lastScrollTopRef.current = st <= 0 ? 0 : st;
  }

  const [isSigningIn, setIsSigningIn] = useState(false);
  const signUpFormRef = useRef(null);

  const toggleSignUpForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  useClickOutside(signUpFormRef, toggleSignUpForm);

  useEffect(() => {
    if (navbarRef.current) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef]); // Removed lastScrollTop from dependencies

  return (
    <>
      <nav
        className={`w-full p-6 bg-gray-800 items-center justify-center fixed top-0 z-50`}
        ref={navbarRef}
      >
        <ContentContainer>
          <ul className="flex items-center justify-between gap-6 text-gray-100 pl-32 pr-32">
            <Link className="cursor-pointer" href={`/`}>
              <li
                className="my-auto font-medium"
                // onClick={() => {
                // 	router.push(`/`, undefined, {
                // 		shallow: true,
                // 	});
                // }}
              >
                YAnime
              </li>
            </Link>
            <div className="flex gap-10">
              <li className="my-auto font-medium cursor-pointer">Search</li>
              <li className="my-auto font-medium8i6 cursor-pointer">Social</li>
              <li className="my-auto font-medium cursor-pointer">Forum</li>
            </div>

            <div className="flex gap-4">
              <UserNavigation />
            </div>
          </ul>
        </ContentContainer>
      </nav>
    </>
  );
}
