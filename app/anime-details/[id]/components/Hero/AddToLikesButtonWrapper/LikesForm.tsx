"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import { toast } from "react-toastify";

type Props = { english: string; id: string; modalId: string };

export default function Form({ english, id }: Props) {
  const { userId }: { userId: any } = useAuth();

  const handleAddToLikes = async (formData: any) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget): void;
    const rating = formData.get("rating-10");

    const likeData = {
      animeId: id,
      animeTitle: english,
      userId: userId,
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
    <form className="modal-backdrop" onSubmit={handleAddToLikes}>
      <div className="rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" />
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
            const closeModal = () => {
              const modalElement = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement | null;
              if (modalElement) {
                modalElement.close();
              }
            };
            closeModal();
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
}
