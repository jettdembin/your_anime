import { BookmarkIcon } from "@radix-ui/react-icons";

import AddToListForm from "@/ui/Card/AnimeCard/Modal/AddToListForm";
import Modal from "@/ui/Modal";

type Props = {};

export default function AddToListButtonWrapper({}: Props) {
  const showModal = () => {
    const modalElement = document.getElementById(
      "add_to_list_modal"
    ) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <button
          tabIndex={0}
          className="flex items-center w-full p-2 bg-blue-200 rounded-sm cursor-pointer relative"
          onClick={() => {
            showModal();
          }}
        >
          <div className="w-full flex items-center justify-end py-2">
            <span className="absolute inset-0 flex justify-center items-center">
              Add to List
            </span>
            <BookmarkIcon
              className="relative bottom-[.1px] w-2 h-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevents the modal from opening twice
                showModal();
              }}
            />
          </div>
        </button>

        <Modal id="add_to_list_modal">
          <AddToListForm />
        </Modal>
        {/* <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box"
        >
          {watchOptions?.map((option) => (
            <li>
              <a
                onClick={() => {
                  handleAddToList(`${option.value}`);
                }}
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
