import Modal from "@/ui/Modal";
import RatingForm from "../AnimeDetailsContent/RatingForm";

type Props = {};

export default function AddToLikesButtonWrapper({}: Props) {
  return (
    <>
      <button
        className="py-2 bg-red-400 rounded-sm text-white"
        onClick={() => {
          document.getElementById("my_modal_2").showModal();
        }}
      >
        ♥
      </button>
      <Modal>
        <RatingForm />
      </Modal>
    </>
  );
}
