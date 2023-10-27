"use client";

import React, { useState, useRef, useEffect } from "react";

import {
	SignedOut,
	SignedIn,
	useAuth,
	SignIn,
	UserButton,
	SignInButton,
	auth,
	currentUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { SignUp } from "@clerk/clerk-react";

// import Login from "../Elements/Login";

import useClickOutside from "@/src/hooks/useClickOutside";

export default async function Nav() {
	const [lastScrollTop, setLastScrollTop] = useState(0);
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

	//scroll animation
	useEffect(() => {
		function handleScroll() {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTop) {
				// downscroll code
				setNavClass(
					"transform -translate-y-full transition-transform duration-300"
				);
			} else {
				// upscroll code
				setNavClass(
					"transform translate-y-0 transition-transform duration-300"
				);
			}
			setLastScrollTop(st <= 0 ? 0 : st);
		}

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollTop]);

	const router = useRouter();

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
							<li className="my-auto font-medium cursor-pointer">Social</li>
							<li className="my-auto font-medium cursor-pointer">Forum</li>
						</div>

						<div className="flex gap-4">
							<SignedOut>
								<li
									className="my-auto font-medium cursor-pointer"
									onClick={() => {
										router.push(`/sign-in`, undefined, {
											shallow: true,
										});
									}}
									// onClick={() => {
									// 	setIsLoggingIn(true);
									// }}
								>
									Log In
								</li>
								<li
									className="my-auto font-medium cursor-pointer"
									onClick={() => {
										setIsSigningUp(true);
									}}
								>
									Sign up
								</li>
							</SignedOut>
							<SignedIn>
								<li
									className="my-auto font-medium cursor-pointer"
									onClick={() => {
										router.push(`/dashboard/${userId}`, undefined, {
											shallow: true,
										});
									}}
								>
									Dashboard
								</li>
								<li>
									<UserButton />
								</li>
							</SignedIn>
						</div>
					</ul>
				</div>
			</nav>
			{isLoggingIn ? (
				<div className="overflow-hidden">
					{console.log("Rendering SignIn component")}
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
			) : null}
		</>
	);
}
