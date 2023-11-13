"use client";

import { useRef, useEffect, useState } from "react";

import { SignedOut, SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useAnimeDetails } from "@/src/graphql/queries";
import { useAuthContext } from "@/src/context/AuthContext";

const AnimeDetails = ({
	params,
}: {
	params: { id: string; userId: string };
}) => {
	const { auth } = useAuthContext();
	const router = useRouter();

	const { userId } = useAuth();

	const animeDescriptionRef = useRef(null);

	const { error, loading, data } = useAnimeDetails(params.id);
	const anime = data?.Media;
	const { title } = anime || {};
	const { english } = title || {};

	const [ratingModalOpen, setRatingModalOpen] = useState(false);

	const handleAddToLikes = async () => {
		// setRatingModalOpen(true);

		const likeData = {
			animeId: params.id, // Pass the GraphQL ID of the anime.
			animeTitle: english,
			userId: auth?.id,
		};
		debugger;

		// Show a pending toast first.
		const toastId = toast("Adding your like...", {
			autoClose: false,
		});

		axios
			.post("/api/postLike", likeData)
			.then((response) => {
				// Close the pending toast.
				toast.dismiss(toastId);

				// Show success toast.
				toast.success("Added to your likes 💘");
			})
			.catch((error) => {
				// Close the pending toast.
				toast.dismiss(toastId);

				let errorMessage = "Failed to add like";

				// If the API returned a custom error message, use it.
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					errorMessage = error.response.data.message;
				}

				// Show error toast with either default or custom message.
				toast.error(errorMessage);
			});
	};

	useEffect(() => {
		if (data && !!animeDescriptionRef?.current) {
			animeDescriptionRef.current.innerHTML = anime.description;
		}
	}, [data?.Media, anime?.description, data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	// Define the Hero component
	const hero = (
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
							<button className="py-2 bg-blue-200 rounded-sm">
								Add to List
							</button>
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
						<p className="text-gray-700" ref={animeDescriptionRef}></p>
					</div>
				</div>
			</div>
		</div>
	);

	const animeRating = (
		<div className="mb-4">
			<div className="bg-white shadow-sm p-4">
				<h6>⭐#{anime.averageScore} Highest Rated All Time</h6>
			</div>
		</div>
	);

	const animePopularity = (
		<div className="mb-4">
			<div className="flex items-center bg-white shadow-sm p-4">
				<h6 className="">
					💖 #{anime.popularity} <span>Most Popular All Time</span>
				</h6>
			</div>
		</div>
	);

	const animeInfo = (
		<div className="">
			<ul className="flex flex-col space-y-4 rounded-md bg-white shadow-sm p-4">
				{anime.format && (
					<li>
						<h6>Format</h6>
						<p className="text-sm text-slate-700">{anime.format}</p>
					</li>
				)}
				{anime.duration && (
					<li>
						<h6>Episode Duration</h6>
						<p className="text-sm text-slate-700">{anime.duration}</p>
					</li>
				)}
				{anime.status && (
					<li>
						<h6>Status</h6>
						<p className="text-sm text-slate-700">{anime.status}</p>
					</li>
				)}
				{anime.startDate.year && (
					<li>
						<h6>Start Date</h6>
						<p className="text-sm text-slate-700">{anime.startDate.year}</p>
					</li>
				)}
				{anime.season && (
					<li>
						<h6>Season</h6>
						<p className="text-sm text-slate-700">{anime.season}</p>
					</li>
				)}
				{anime.averageScore && (
					<li>
						<h6>Average Score</h6>
						<p className="text-sm text-slate-700">{anime.averageScore}</p>
					</li>
				)}
				{anime.meanScore && (
					<li>
						<h6>Mean Score</h6>
						<p className="text-sm text-slate-700">{anime.meanScore}</p>
					</li>
				)}
				{anime.popularity && (
					<li>
						<h6>Popularity</h6>
						<p className="text-sm text-slate-700">{anime.popularity}</p>
					</li>
				)}
				{anime.favourites && (
					<li>
						<h6>Favorites</h6>
						<p className="text-sm text-slate-700">{anime.favourites}</p>
					</li>
				)}
				{anime.studios?.nodes?.name && (
					<li>
						<h6>Studios</h6>
						<p className="text-sm text-slate-700">
							{anime.studios?.nodes?.name}
						</p>
					</li>
				)}
				{anime.producers && (
					<li>
						<h6>Producers</h6>
						<p className="text-sm text-slate-700">{anime.producers}</p>
					</li>
				)}
				{anime.source && (
					<li>
						<h6>Source</h6>
						<p className="text-sm text-slate-700">{anime.source}</p>
					</li>
				)}
				{anime.hashtag && (
					<li>
						<h6>Hashtag</h6>
						<p className="text-sm text-slate-700">{anime.hashtag}</p>
					</li>
				)}
				{anime.genres && anime.genres.length > 0 && (
					<li>
						<h6>Genres</h6>
						<p className="text-sm text-slate-700">{anime.genres.join(", ")}</p>
					</li>
				)}
				{anime.title.romaji && (
					<li>
						<h6>Romaji</h6>
						<p className="text-sm text-slate-700">{anime.title.romaji}</p>
					</li>
				)}
				{anime.title.english && (
					<li>
						<h6>English</h6>
						<p className="text-sm text-slate-700">{anime.title.english}</p>
					</li>
				)}
				{anime.title.native && (
					<li>
						<h6>Native</h6>
						<p className="text-sm text-slate-700">{anime.title.native}</p>
					</li>
				)}
				{anime.synonyms && (
					<li>
						<h6>Synonyms</h6>
						<p className="text-sm text-slate-700">{anime.synonyms}</p>
					</li>
				)}
			</ul>
		</div>
	);

	const tags = (
		<div className="py-6">
			<h6>Tags</h6>
			<div className="relative space-y-4 pt-4">
				{anime.tags.map((tag) => (
					<div key={tag.name} className="px-3 py-2 bg-white rounded-sm">
						{tag.name}
					</div>
				))}
			</div>
		</div>
	);

	const relationCard = (relation) => (
		<div className="grid bg-white" style={{ gridTemplateColumns: "20% auto" }}>
			<div>
				<img
					className="w-full object-cover rounded-sm"
					src={anime.coverImage.extraLarge}
					alt={anime.title.english}
				/>
			</div>
			<div className="p-4 flex flex-col">
				<h6>Source</h6>
				<p className="mt-1">{relation.title.english}</p>
				<p className="mt-auto">
					{relation.type} - {relation.status}
				</p>
			</div>
		</div>
	);

	const relations = (
		<section>
			<h3 className="text-base mb-2">Relations</h3>
			<div className="flex flex-col space-y-4">
				{anime?.relations?.nodes.map((relation, index) => {
					console.log(relation);
					return <div key={index}>{relationCard(relation)}</div>;
				})}
			</div>
		</section>
	);

	const characterCard = (character) => (
		<div
			className="grid bg-white"
			style={{ gridTemplateColumns: "20% auto 20%" }}
		>
			<div>
				<img
					className="w-full object-cover rounded-sm"
					src={character.image.large}
					alt={character.image.large}
				/>
			</div>
			<div className="p-4 flex flex-col">
				<h6>Source</h6>
				<p className="mt-1">{character.name.full}</p>
				<p className="mt-auto">
					{character.name.full} - {character.name.full}
				</p>
			</div>
			<div>
				<img
					className="w-full object-cover rounded-sm"
					src={anime.coverImage.extraLarge}
					alt={anime.title.english}
				/>
			</div>
		</div>
	);

	const characters = (
		<section>
			<h3 className="text-base mb-2">Characters</h3>
			<div className="flex flex-col space-y-4">
				{anime?.characters?.nodes.map((character, index) => {
					console.log(character);
					return <div key={index}>{characterCard(character)}</div>;
				})}
			</div>
		</section>
	);

	return (
		<div>
			<main>
				{/* Open the modal using document.getElementById('ID').showModal() method */}

				<section>{hero}</section>
				<div className="container mx-auto py-6">
					<dialog id="my_modal_2" className="modal">
						<div className="modal-box">
							<h3 className="font-bold text-lg text-white">
								Add to Favorites with a Rating! 😋
							</h3>
							<section className="mt-4">
								<form
									method="post"
									className="modal-backdrop"
									onSubmit={(e) => {
										e.preventDefault();
										handleAddToLikes();
									}}
								>
									<div className="rating rating-lg rating-half">
										<input
											type="radio"
											name="rating-10"
											className="rating-hidden"
										/>
										<input
											type="radio"
											name="rating-10"
											value={0.5}
											className="bg-green-500 mask mask-star-2 mask-half-1"
										/>
										<input
											type="radio"
											name="rating-10"
											value={1}
											className="bg-green-500 mask mask-star-2 mask-half-2"
										/>
										<input
											type="radio"
											name="rating-10"
											value={1.5}
											className="bg-green-500 mask mask-star-2 mask-half-1"
										/>
										<input
											type="radio"
											name="rating-10"
											value={2}
											className="bg-green-500 mask mask-star-2 mask-half-2"
										/>
										<input
											type="radio"
											name="rating-10"
											value={2.5}
											className="bg-green-500 mask mask-star-2 mask-half-1"
										/>
										<input
											type="radio"
											name="rating-10"
											value={3}
											className="bg-green-500 mask mask-star-2 mask-half-2"
										/>
										<input
											type="radio"
											name="rating-10"
											value={3.5}
											className="bg-green-500 mask mask-star-2 mask-half-1"
										/>
										<input
											type="radio"
											name="rating-10"
											value={4}
											className="bg-green-500 mask mask-star-2 mask-half-2"
										/>
										<input
											type="radio"
											name="rating-10"
											value={4.5}
											className="bg-green-500 mask mask-star-2 mask-half-1"
										/>
										<input
											type="radio"
											name="rating-10"
											value={5}
											className="bg-green-500 mask mask-star-2 mask-half-2"
										/>
									</div>

									<div className="modal-action">
										{/* if there is a button in form, it will close the modal */}
										<button
											className="btn"
											type="submit"
											onClick={() => {
												document.getElementById("my_modal_2").close();
											}}
										>
											Add
										</button>
									</div>
								</form>
							</section>
							<form method="dialog" className="modal-backdrop">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
									✕
								</button>
							</form>
						</div>
					</dialog>
					<section
						className="grid gap-10"
						style={{ gridTemplateColumns: "270px auto" }}
					>
						<section>
							{animeRating}
							{animePopularity}
							{animeInfo}
							{tags}
						</section>
						<section>
							{relations}
							{characters}
						</section>
					</section>
				</div>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</main>
		</div>
	);
};

export default AnimeDetails;
