"use client";

import { useRef, useState } from "react";

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

  const toggleSignUpForm = () => {
    setIsSigningUp(!isSigningUp);
  };
  const toggleLogInForm = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  useClickOutside(signUpFormRef, toggleSignUpForm);
  useClickOutside(logInFormRef, toggleLogInForm);

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
