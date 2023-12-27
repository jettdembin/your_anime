"use client";

import { useEffect, useRef, useState } from "react";

import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import useClickOutside from "@/hooks/useClickOutside";

import LoginWrapper from "../../ui/LoginWrapper";

type Props = {};

export default function UserNavigation({}: Props) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const signUpFormRef = useRef(null);
  const logInFormRef = useRef(null);

  // Change here: Specify that navbarRef is a reference to an HTMLDivElement
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleSignUpForm = () => {
    setIsSigningUp(!isSigningUp);
  };
  const toggleLogInForm = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  useClickOutside(signUpFormRef, toggleSignUpForm);
  useClickOutside(logInFormRef, toggleLogInForm);

  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    // Removed: navbarRef.current = document.getElementById("navbar");

    function handleScroll() {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTopRef.current) {
        // When hiding the navbar
        navbarRef.current?.classList.remove("translate-y-0", "duration-150");
        navbarRef.current?.classList.add("-translate-y-full", "duration-150");
      } else {
        // When showing the navbar
        navbarRef.current?.classList.remove(
          "-translate-y-full",
          "duration-150"
        );
        navbarRef.current?.classList.add("translate-y-0", "duration-150");
      }
      lastScrollTopRef.current = st <= 0 ? 0 : st;
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Removed lastScrollTop from dependencies

  const { userId } = useAuth();
  return (
    <>
      <LoginWrapper signIn>
        <li className="my-auto font-medium cursor-pointer">Sign In</li>
      </LoginWrapper>
      <LoginWrapper signUp>
        <li className="my-auto font-medium cursor-pointer">Sign Up</li>
      </LoginWrapper>
      <div className="flex gap-2 md:gap-4">
        <SignedIn>
          <Link
            className="cursor-pointer flex items-center"
            href={`/dashboard/${userId}`}
          >
            <li className="my-auto font-medium hidden md:block">Dashboard</li>
            <li className="my-auto font-medium block md:hidden">
              <PersonIcon />
            </li>
          </Link>
          <li>
            <UserButton />
          </li>
        </SignedIn>{" "}
      </div>
    </>
  );
}
