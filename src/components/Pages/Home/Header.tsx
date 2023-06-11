import Image from "next/image";

import LoginWrapper from "../../Elements/LoginWrapper";

// import LoginWrapper from "@/src/app/components/Elements/LoginWrapper";

export default function HomeHeader() {
	return (
		<header className="max-w-7xl mx-0 lg:mx-20 xl:mx-auto relative bg-gray-800 py-16 px-10 shadow-2xl lg:mt-12 lg:rounded-3xl">
			<h1 className="text-3xl font-bold text-gray-100 mb-10 mx-auto max-w-full text-center">
				The next generation anime platform
			</h1>
			<h2 className="max-w-full text-xl text-center text-blue-200">
				Track, share, and discover your favorite anime and manga with
				YourAnime😍
			</h2>
			<div className="grid grid-cols-2 mx-auto my-24 gap-y-20 gap-x-16">
				<div
					className="grid grid-cols-2"
					style={{
						display: "grid",
						gridTemplateColumns: "80px auto",
						gridGap: "40px",
					}}
				>
					<Image
						width={100}
						height={100}
						src="https://anilist.co/img/landing/stats.svg"
						alt="pic"
						role="presentation"
					/>
					<div>
						<h3 className="text-lg font-semibold text-gray-100">
							Discover your obsessions<span className="ml-2">🔎</span>
						</h3>
						<p className="text-md text-blue-200">
							What are your highest rated genres or most watched voice actors?
							Follow your watching habits over time with in-depth statistics.
						</p>
					</div>
				</div>
				<div
					className="grid grid-cols-2"
					style={{
						display: "grid",
						gridTemplateColumns: "80px auto",
						gridGap: "40px",
					}}
				>
					<Image
						width={100}
						height={100}
						src="	https://anilist.co/img/landing/apps.svg"
						alt="pic"
						role="presentation"
					/>
					<div>
						<h3 className="text-lg font-semibold text-gray-100">
							Bring YourAnime anywhere <span className="ml-2">🌎</span>
						</h3>
						<p className="text-md text-blue-200">
							What are your highest rated genres or most watched voice actors?
							Follow your watching habits over time with in-depth statistics.
						</p>
					</div>
				</div>
				<div
					className="grid grid-cols-2"
					style={{
						display: "grid",
						gridTemplateColumns: "80px auto",
						gridGap: "40px",
					}}
				>
					<Image
						width={100}
						height={100}
						src="https://anilist.co/img/landing/social.svg"
						alt="pic"
						role="presentation"
					/>
					<div>
						<h3 className="text-lg font-semibold text-gray-100">
							Join the conversation <span className="ml-2">📝</span>
						</h3>
						<p className="text-md text-blue-200">
							What are your highest rated genres or most watched voice actors?
							Follow your watching habits over time with in-depth statistics.
						</p>
					</div>
				</div>
				<div
					className="grid grid-cols-2"
					style={{
						display: "grid",
						gridTemplateColumns: "80px auto",
						gridGap: "40px",
					}}
				>
					<Image
						width={100}
						height={100}
						src="https://anilist.co/img/landing/custom.svg"
						alt="pic"
						role="presentation"
					/>
					<div>
						<h3 className="text-lg font-semibold text-gray-100">
							Tweak it to your liking <span className="ml-2">💕</span>
						</h3>
						<p className="text-md text-blue-200">
							What are your highest rated genres or most watched voice actors?
							Follow your watching habits over time with in-depth statistics.
						</p>
					</div>
				</div>
			</div>
			<LoginWrapper>
				<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 cursor-pointer">
					<div
						// href="/signup"
						className="flex w-72 items-center justify-around pl-14  py-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200"
					>
						<div className="text-2xl font-bold tracking-wider">Join Now</div>
						<div className="flex items-center justify-center bg-white text-blue-500 rounded-full w-10 h-10">
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="chevron-right"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
								className="w-4 h-4 fill-current"
							>
								<path
									fill="currentColor"
									d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</LoginWrapper>
		</header>
	);
}
