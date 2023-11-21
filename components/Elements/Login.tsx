// "use client";

// import { useState, useRef } from "react";

// import { SignUp } from "@clerk/clerk-react";
// import { signIn } from "next-auth/react";

// import useClickOutside from "@/hooks/useClickOutside";

// export default function Login() {
// 	const [isSigningIn, setIsSigningIn] = useState(false);
// 	const signUpFormRef = useRef(null);

// 	const toggleSignUpForm = () => {
// 		setIsSigningIn(!isSigningIn);
// 	};

// 	useClickOutside(signUpFormRef, toggleSignUpForm);

// 	if (isSigningIn)
// 		return (

// 		);

// 	return (
// 		<li
// 			className="my-auto font-medium cursor-pointer"
// 			onClick={() => {
// 				setIsSigningIn(true);
// 			}}
// 		>
// 			Login
// 		</li>
// 	);
// }
