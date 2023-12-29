"use client";

import { showModal } from "@/util";

import Modal from "@/ui/Modal";

import { GearIcon } from "@radix-ui/react-icons";

type Props = {};

export default function MobileNavWiget({}: Props) {
  return (
    <nav className="z-50 fixed bottom-8 right-4 bg-white p-4 rounded-lg">
      <button
        tabIndex={0}
        className="flex items-center w-full p-2 bg-blue-200 rounded-sm cursor-pointer relative"
        onClick={() => showModal("navbar_modal")}
      >
        <GearIcon />
      </button>
      <Modal
        id="navbar_modal"
        className="fixed bottom-8 right-4 w-32 shadow-md"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <GearIcon className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-center">
              <GearIcon className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <GearIcon className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-center">
              <GearIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </Modal>
    </nav>
  );
}
