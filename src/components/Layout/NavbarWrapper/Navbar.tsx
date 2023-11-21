"use client";

import React, { useState, useRef, useEffect } from "react";

import { SignedOut, SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useAuthContext } from "@/src/context/AuthContext";
import useClickOutside from "@/src/hooks/useClickOutside";
import LoginWrapper from "../../Elements/LoginWrapper";

export default function Navbar() {
	const [navClass, setNavClass] = useState(
		"transform translate-y-0 transition-transform duration-300"
	);
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

	const lastScrollTopRef = useRef(0);

	useEffect(() => {
		function handleScroll() {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTopRef.current) {
				setNavClass(
					"transform -translate-y-full transition-transform duration-300"
				);
			} else {
				setNavClass(
					"transform translate-y-0 transition-transform duration-300"
				);
			}
			lastScrollTopRef.current = st <= 0 ? 0 : st;
		}

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Removed lastScrollTop from dependencies

	const router = useRouter();

	const { userId } = useAuth();

	return (
		<>
			<nav
				className={`w-full p-6 bg-gray-800 items-center justify-center fixed top-0 z-50 ${navClass} opacity-90`}
			>
				<div className="container mx-auto">
					<ul className="flex justify-between gap-6 text-gray-100">
						<li
							className="my-auto font-medium cursor-pointer"
							onClick={() => {
								router.push(`/`, undefined, {
									shallow: true,
								});
							}}
						>
							YAnime
						</li>
						<div className="flex gap-10">
							<li className="my-auto font-medium cursor-pointer">Search</li>
							<li className="my-auto font-medium8i6 cursor-pointer">Social</li>
							<li className="my-auto font-medium cursor-pointer">Forum</li>
						</div>

						<div className="flex gap-4">
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
						</div>
					</ul>
				</div>
			</nav>
			{/* {isLoggingIn ? (
				<div className="overflow-hidden">
					<div className="fixed w-screen h-screen top-0 left-0 bg-gray-600 z-10 opacity-75"></div>
					<div className="fixed w-screen h-screen z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
						<div ref={logInFormRef}>
							<SignIn />
						</div>
					</div>
				</div>
			) : null}
			{isSigningUp ? (
				<div className="overflow-hidden">
					<div className="fixed w-screen h-screen top-0 left-0 bg-gray-600 z-10 opacity-75"></div>
					<div className="fixed w-screen h-screen z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
						<div ref={signUpFormRef}>
							<SignUp />
						</div>
					</div>
				</div>
			) : null} */}
		</>
	);
}
