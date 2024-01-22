"use client";

import { Fragment } from "react";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-toastify";

type Props = { english: string; id: string; modalId: string };

export default function Form({ english, id }: Props) {
  const { userId }: { userId: any } = useAuth();

  const handleAddToLikes = async (formData: any) => {
    const rating = formData.get("rating-10");

    const likeData = {
      animeId: id,
      animeTitle: english,
      userId: userId,
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
        {/* Labels for screen readers */}
        {[...Array(10)].map((_, index) => (
          <Fragment key={index}>
            <label htmlFor={`rating-${index / 2 + 0.5}`} className="sr-only">
              Rating {index / 2 + 0.5} stars
            </label>
            <input
              type="radio"
              id={`rating-${index / 2 + 0.5}`}
              name="rating-10"
              value={index / 2 + 0.5}
              className={`bg-green-500 mask mask-star-2 ${
                index % 2 === 0 ? "mask-half-1" : "mask-half-2"
              }`}
            />
          </Fragment>
        ))}
      </div>

      <div className="modal-action">
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
