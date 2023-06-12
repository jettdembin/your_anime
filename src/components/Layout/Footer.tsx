"use client";

import React, { useState } from "react";

const Footer: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
		console.log(isDarkMode);
		console.log("clicked");
	};

	return (
		<footer
			className={`bg-gray-900 ${isDarkMode ? "text-white" : "text-gray-400"}`}
		>
			<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
				<div className="mb-4 md:mb-0">
					<h3 className="text-lg font-bold">YourAnime</h3>
					<p className="mt-2">Discover new anime and track your progress.</p>
				</div>
				<div className="flex items-center">
					<button
						className={`mr-4 focus:outline-none transition duration-300 ${
							isDarkMode ? "text-gray-400" : "text-white"
						}`}
						onClick={toggleTheme}
					>
						Dark Mode
					</button>
					<div
						className={`w-10 h-6 flex items-center justify-between rounded-full bg-gray-400 ${
							isDarkMode ? "bg-indigo-600" : "bg-white"
						}`}
					>
						<div
							className={`w-4 h-4 rounded-full bg-white shadow transform ${
								isDarkMode ? "translate-x-4" : "translate-x-0"
							} transition duration-300`}
						></div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
