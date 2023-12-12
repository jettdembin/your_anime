"use client";

import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";

import Modal from "@/ui/Modal";
import LikesForm from "./AddToLikesButtonWrapper/LikesForm";

type Props = { params: { id: string }; english: string };

export default function AddToLikesButtonWrapper({ params, english }: Props) {
  const { userId }: any = useAuth();

  const handleAddToLikes = async () => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const rating = formData.get("rating-10");

    const likeData = {
      animeId: params?.id,
      animeTitle: english,
      userId: userId,
      rating: "",
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
        closeOnClick: true,
      });
    } catch (error: any) {
      let errorMessage = "Failed to add like";
      if (error?.response && error.response.status === 409) {
        errorMessage = error?.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <button
        className="py-2 bg-red-400 rounded-sm text-white"
        onClick={handleAddToLikes}
        // onClick={() => {
        //   document.getElementById("add_to_likes_modal").showModal();
        // }}
      >
        ♥
      </button>
      {/* <Modal id="add_to_likes_modal">
        <LikesForm
          english={english}
          id={params?.id}
          modalId="add_to_likes_modal"
        />
      </Modal> */}
    </>
  );
}
