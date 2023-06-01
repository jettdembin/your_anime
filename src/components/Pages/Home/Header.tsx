import Image from "next/image";

export default function HomeHeader() {
	return (
		<>
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
			<div className="absolute bottom-0 left-1/2">
				<button className="bg-gray-50 rounded-lg px-4 py-2 mx-auto">
					Join ⏩
				</button>
			</div>
		</>
	);
}
