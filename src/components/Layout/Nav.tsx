"use client";

import React, { useState, useEffect } from "react";
import Login from "../Elements/Login";

export default function Nav() {
	const [lastScrollTop, setLastScrollTop] = useState(0);
	const [navClass, setNavClass] = useState(
		"transform translate-y-0 transition-transform duration-300"
	);

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

	return (
		<nav
			className={`lg:flex w-full p-8 bg-gray-800 items-center justify-center fixed top-0 z-50 ${navClass} opacity-90`}
		>
			<ul className="flex gap-60 text-gray-100">
				<li className="my-auto font-medium">YAnime</li>
				<div className="flex gap-10">
					<li className="my-auto font-medium cursor-pointer">Search</li>
					<li className="my-auto font-medium cursor-pointer">Social</li>
					<li className="my-auto font-medium cursor-pointer">Forum</li>
				</div>
				<div className="flex gap-4">
					<Login />
					<li>
						<button className="rounded-md bg-blue-500 text-white px-3 py-1 font-medium">
							Sign Up
						</button>
					</li>
				</div>
			</ul>
		</nav>
	);
}
