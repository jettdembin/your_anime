"use client";

import { useState, useRef } from "react";

import { SignUp } from "@clerk/clerk-react";
import { signIn } from "next-auth/react";

import useClickOutside from "@/src/hooks/useClickOutside";

interface FilterProps {
	children?: any;
}

const LoginWrapper: React.FC<FilterProps> = ({ children }) => {
	const [isSigningIn, setIsSigningIn] = useState(false);
	const signUpFormRef = useRef(null);

	const toggleSignUpForm = () => {
		setIsSigningIn(!isSigningIn);
	};

	useClickOutside(signUpFormRef, toggleSignUpForm);

	return (
		<div
			onClick={() => {
				setIsSigningIn(true);
			}}
		>
			{children}
			{isSigningIn && (
				<div className="overflow-hidden">
					<div className="fixed w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 z-10 opacity-50"></div>
					<div className="fixed w-screen h-screen z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center justify-center">
						<div ref={signUpFormRef}>
							<SignUp />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginWrapper;
