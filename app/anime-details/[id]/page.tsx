"use client";

import { useRef, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/Elements/HoverCard";

import { useAnimeDetails } from "@/graphql/queries";
import { useAuthContext } from "@/context/AuthContext";
import useClickOutside from "@/hooks/useClickOutside";
import Hero from "@/components/Pages/Discover/components/Layout/Hero";
import Main from "@/components/Pages/Discover/components/Layout/Main";

const AnimeDetails = ({
	params,
}: {
	params: { id: string; userId: string };
}) => {
	//listens to user click to close div if button click not contained in div
	const ratingModalRef = useRef(null);

	// const [showModal, setShowModal] = useState(false);

	useClickOutside(ratingModalRef, () => {
		document.getElementById("my_modal_2").close();
	});

	const { auth } = useAuthContext();
	const router = useRouter();

	const { userId } = useAuth();

	const animeDescriptionRef = useRef(null);

	const { error, loading, data } = useAnimeDetails(params.id);
	const anime = data?.Media;
	const { title } = anime || {};
	const { english } = title || {};

	const handleAddToList = async (listType, rating = 0) => {
		const listData = {
			animeId: params.id,
			animeTitle: english,
			userId: auth?.id,
			rating: rating,
			listType: listType,
		};

		// Show a loading toast first
		const toastId = toast.loading("Adding to your list...");

		try {
			const response = await axios.post("/api/postToList", listData);
			toast.update(toastId, {
				render: `Added to your ${listType} list 💫`,
				type: "success",
				isLoading: false,
				autoClose: 5000,
			});
		} catch (error) {
			let errorMessage =
				error.response?.data?.message || `Failed to add to ${listType} list`;
			toast.update(toastId, {
				render: errorMessage,
				type: "error",
				isLoading: false,
				autoClose: 5000,
			});
		}
	};

	const handleAddToLikes = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const rating = formData.get("rating-10");

		const likeData = {
			animeId: params.id,
			animeTitle: english,
			userId: auth?.id,
			rating: Number(rating) ?? 5,
		};

		// Show a loading toast first
		const toastId = toast.loading("Adding your like...");

		try {
			const response = await axios.post("/api/postLike", likeData);
			toast.update(toastId, {
				render: "Added to your likes 💘",
				type: "success",
				isLoading: false,
				autoClose: 5000,
			});
		} catch (error) {
			let errorMessage = error.response?.data?.message || "Failed to add like";
			toast.update(toastId, {
				render: errorMessage,
				type: "error",
				isLoading: false,
				autoClose: 5000,
			});
		}
	};

	useEffect(() => {
		if (data && !!animeDescriptionRef?.current) {
			animeDescriptionRef.current.innerHTML = anime.description;
		}
	}, [data?.Media, anime?.description, data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<div>
				<header>
					<Hero
						handleAddToList={handleAddToList}
						anime={anime}
						ref={animeDescriptionRef}
					/>
				</header>
				<main className="container mx-auto py-6">
					<Main handleAddToLikes={handleAddToLikes} anime={anime} />
				</main>
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
			</div>
		</div>
	);
};

export default AnimeDetails;
