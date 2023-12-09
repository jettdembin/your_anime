import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

import { toast } from "react-toastify";

type Props = { english: string; id: string };

export default function Form({ english, id }: Props) {
  const { userId }: { userId: string | null } = auth();

  const addToLikes = async (formData: FormData) => {
    "use server";

    const rating = formData.get("rating-10");

    const animeTitle = english;
    const animeId = id;

    // Show a loading toast first
    const toastId = toast.loading("Adding your like...");

    try {
      // Check if a like already exists for the given animeId and userId
      const existingLike = await prisma.like.findFirst({
        where: {
          AND: [{ animeId: animeId }, { userId: userId }],
        },
      });

      if (!existingLike) {
        // If a like doesn't exist, create one
        const newLike = await prisma.like.create({
          data: {
            title: animeTitle,
            animeId: animeId,
            userId: userId,
            rating,
          },
        });

        toast.update(toastId, {
          render: "Added to your likes 💘",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        toast.update(toastId, {
          render: "Already in your likes",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (err) {
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
    <form action={addToLikes} className="modal-backdrop">
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
  );
}
