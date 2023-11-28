"use client";

import React, { useState, useRef, useEffect } from "react";

import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useRouter } from "next/navigation";

import useClickOutside from "@/hooks/useClickOutside";
import LoginWrapper from "../../ui/LoginWrapper";

type Props = {};

export default function UserNavigation({}: Props) {
	const [navClass, setNavClass] = useState(
		"transform translate-y-0 transition-transform duration-300"
	);
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const signUpFormRef = useRef(null);
	const logInFormRef = useRef(null);
	const navbarRef = useRef(null);

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
		navbarRef.current = document.getElementById("navbar");

		function handleScroll() {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTopRef.current) {
				debugger;
				// When hiding the navbar
				navbarRef.current?.classList.remove(
					"transform",
					"translate-y-0",
					"transition-transform",
					"duration-300"
				);
				navbarRef.current?.classList.add(
					"transform",
					"-translate-y-full",
					"transition-transform",
					"duration-300"
				);
				// setNavClass(
				// 	"transform -translate-y-full transition-transform duration-300"
				// );
			} else {
				// When showing the navbar
				navbarRef.current?.classList.remove(
					"transform",
					"-translate-y-full",
					"transition-transform",
					"duration-300"
				);
				navbarRef.current?.classList.add(
					"transform",
					"translate-y-0",
					"transition-transform",
					"duration-300"
				);
				// setNavClass(
				// 	"transform translate-y-0 transition-transform duration-300"
				// );
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
			{/* <SignedOut> */}
			<LoginWrapper signIn>
				<li className="my-auto font-medium cursor-pointer">Sign In</li>
			</LoginWrapper>

			<LoginWrapper signUp>
				<li className="my-auto font-medium cursor-pointer">Sign Up</li>
			</LoginWrapper>

			<SignedIn>
				<li className="my-auto font-medium cursor-pointer">
					<Link href={`/dashboard/${userId}`}>Dashboard</Link>
				</li>
				<li>
					<UserButton />
				</li>
			</SignedIn>
		</>
	);
}
