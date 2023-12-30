"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-toastify";

import LoginWrapper from "@/ui/LoginWrapper";

type Props = { params: { id: string }; english: string };

export default function AddToLikesButtonWrapper({ params, english }: Props) {
  const { userId }: any = useAuth();

  const { isSignedIn } = useUser();

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

  const addToLikesButton = (
    <button
      className="py-1 max-h-[35px] h-[35px] lg:max-h-[none] lg:h-full bg-red-400 rounded-sm text-white w-full"
      onClick={() => isSignedIn && handleAddToLikes()}
      // onClick={() => {
      //   document.getElementById("add_to_likes_modal").showModal();
      // }}
    >
      ♥
    </button>
  );

  const isSignedInAddToListButton = () =>
    isSignedIn ? (
      addToLikesButton
    ) : (
      <LoginWrapper signIn>{addToLikesButton}</LoginWrapper>
    );

  return (
    <div className="w-10 lg:w-12 lg:h-full">{isSignedInAddToListButton()}</div>
  );
}
