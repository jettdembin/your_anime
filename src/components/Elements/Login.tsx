"use client";

import { signIn } from "next-auth/react";

export default function Login() {
	return (
		<li
			className="my-auto font-medium cursor-pointer"
			onClick={() => {
				signIn();
			}}
		>
			Login
		</li>
	);
}
