"use client";

import { useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import LikesForm from "./LikesForm";

type Props = {};

export default function AddToLikesButton({}: Props) {
  //listens to user click to close div if button click not contained in div
  const ratingModalRef = useRef(null);

  useClickOutside(ratingModalRef, () => {
    document.getElementById("my_modal_2").close();
  });

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

  return (
    <div ref={ratingModalRef}>
      <h3 className="font-bold text-lg text-white">
        Add to Favorites with a Rating !! 🐱‍🏍
      </h3>
      <div className="mt-4">
        <LikesForm />
      </div>
      <form method="dialog" className="modal-backdrop">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
          ✕
        </button>
      </form>
    </div>
  );
}
