import Modal from "@/ui/Modal";

import LikesForm from "./AddToLikesButtonWrapper/LikesForm";

type Props = { params: { id: string }; english: string };

export default function AddToLikesButtonWrapper({ params, english }: Props) {
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
        <LikesForm english={english} id={params?.id} />
      </Modal>
    </>
  );
}
