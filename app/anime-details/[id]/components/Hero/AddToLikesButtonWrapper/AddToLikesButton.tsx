"use client";

import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useClickOutside from "@/hooks/useClickOutside";
import LikesForm from "./LikesForm";

// Assuming 'params' and 'english' are passed as props or obtained from a context
type Props = {
  params: { id: string }; // Example type, adjust as necessary
  english: string; // Example type, adjust as necessary
  auth: { id: string }; // Example type, adjust as necessary
};

export default function AddToLikesButton({ params, english, auth }: Props) {
  const ratingModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(ratingModalRef, () => {
    const modalElement = document.getElementById(
      "my_modal_2"
    ) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
  });

  const handleAddToLikes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rating = formData.get("rating-10");

    const likeData = {
      animeId: params.id,
      animeTitle: english,
      userId: auth?.id,
      rating: Number(rating) ?? 5,
    };

    const toastId = toast.loading("Adding your like...");

    try {
      const response = await axios.post("/api/postLike", likeData);
      toast.update(toastId, {
        render: "Added to your likes 💘",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error: any) {
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
        <LikesForm english={""} id={""} modalId={""} />
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onSubmit={handleAddToLikes}
      >
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
          ✕
        </button>
      </form>
    </div>
  );
}
