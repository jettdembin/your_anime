import Modal from "@/ui/Modal";

import LikesForm from "./AddToLikesButtonWrapper/LikesForm";

type Props = { params: { id: string }; english: string };

export default function AddToLikesButtonWrapper({ params, english }: Props) {
  return (
    <>
      <button
        className="py-2 bg-red-400 rounded-sm text-white"
        onClick={() => {
          document.getElementById("add_to_likes_modal").showModal();
        }}
      >
        ♥
      </button>
      <Modal id="add_to_likes_modal">
        <LikesForm
          english={english}
          id={params?.id}
          modalId="add_to_likes_modal"
        />
      </Modal>
    </>
  );
}
