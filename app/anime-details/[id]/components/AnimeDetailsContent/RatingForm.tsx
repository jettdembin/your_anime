"use client";

import { useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";

type Props = {};

export default function RatingForm({}: Props) {
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
      <section className="mt-4">
        <form
          method="post"
          className="modal-backdrop"
          onSubmit={handleAddToLikes}
        >
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
  );
}
