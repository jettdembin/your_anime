import React from "react";

type Props = {};

export default function Hero({ handleAddToList, anime, ref }: Props) {
	return (
		<div className="header-wrap relative bg-slate-50">
			<div
				className="banner w-full h-[400px] -mt-12 relative"
				style={{
					background: `url(${anime.bannerImage})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 35%",
				}}
			>
				<div
					className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
					style={{
						background:
							"linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
					}}
				></div>
			</div>
			<div className="header container mx-auto">
				<div
					className="container grid gap-7 max-w-6xl "
					style={{ gridTemplateColumns: "270px auto" }}
				>
					<div className="relative -mt-32">
						<div className="static shadow-lg">
							<img
								className="w-full object-cover rounded-sm"
								src={anime.coverImage.extraLarge}
								alt={anime.title.english}
							/>
						</div>
						<div
							className="grid my-5 gap-4"
							style={{ gridTemplateColumns: "auto 35px" }}
						>
							<div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
								<button
									tabIndex={0}
									className="w-full py-2 text-center bg-blue-200 rounded-sm cursor-pointer"
								>
									Add to List
								</button>
								<ul
									tabIndex={0}
									className="dropdown-content z-[1] menu p-2 shadow rounded-box"
								>
									<li>
										<a
											onClick={() => {
												handleAddToList("WATCHING");
											}}
										>
											Watching
										</a>
									</li>
									<li>
										<a
											onClick={() => {
												handleAddToList("WATCHED");
											}}
										>
											Completed
										</a>
									</li>
									<li>
										<a
											onClick={() => {
												handleAddToList("TO_WATCH");
											}}
										>
											Plan to Watch
										</a>
									</li>
									<li>
										<a
											onClick={() => {
												handleAddToList("DROPPED");
											}}
										>
											Dropped
										</a>
									</li>
								</ul>
							</div>
							{/* <HoverCard>
                        <HoverCardTrigger>
                            <div
                                className="py-2 text-center bg-blue-200 rounded-sm w-full cursor-pointer"
                                tabIndex={0}
                            >
                                Add to List
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <div>
                                <button
                                    className="py-2  rounded-sm w-full"
                                    onClick={() => {
                                        handleAddToList("WATCHED");
                                    }}
                                >
                                    Completed
                                </button>
                                <button
                                    className="py-2  rounded-sm w-full"
                                    onClick={() => {
                                        handleAddToList("WATCHING");
                                    }}
                                >
                                    Watching
                                </button>
                                <button
                                    className="py-2  rounded-sm w-full"
                                    onClick={() => {
                                        handleAddToList("TO_WATCH");
                                    }}
                                >
                                    Plan to Watch
                                </button>
                                <button
                                    className="py-2  rounded-sm w-full"
                                    onClick={() => {
                                        handleAddToList("DROPPED");
                                    }}
                                >
                                    Dropped
                                </button>
                            </div>
                        </HoverCardContent>
                    </HoverCard> */}

							<button
								className="py-2 bg-red-400 rounded-sm text-white"
								onClick={() => {
									document.getElementById("my_modal_2").showModal();
								}}
							>
								♥
							</button>
						</div>
					</div>

					<div className="pt-6 pb-4">
						<h2 className="text-3xl mb-2">{anime.title.english}</h2>
						<p className="text-gray-700" ref={ref}></p>
					</div>
				</div>
			</div>
		</div>
	);
}
