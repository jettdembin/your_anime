"use client";

import { useRef, useState } from "react";

import {
  Cross2Icon,
  GearIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  RowsIcon,
} from "@radix-ui/react-icons";

import { showModal } from "@/util";

import useClickOutside from "@/hooks/useClickOutside";

import Modal from "@/ui/Modal";

type Props = {};

export default function MobileNavWiget({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mobileNavWidgetRef = useRef(null);

  useClickOutside(mobileNavWidgetRef, () => {
    setIsModalOpen(false);
    // debugger;
  });

  return (
    <>
      <nav
        ref={mobileNavWidgetRef}
        className={`z-50 fixed bottom-8 right-4  p-4 rounded-lg shadow-custom cursor-pointer transition-all duration-150 ease-linear ${
          isModalOpen ? "bg-transparent scale-75" : "bg-white scale-100"
        } `}
        tabIndex={0}
        onClick={() => {
          setIsModalOpen(true);
          showModal("navbar_modal");
        }}
      >
        <div className={`flex items-center w-full`}>
          <RowsIcon className="w-6 h-6 text-slate-800" />
        </div>
      </nav>
      <Modal
        id="navbar_modal"
        className={`fixed bottom-8 right-4 w-32 shadow-md`}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <PersonIcon
                strokeWidth={5}
                stroke="5"
                className="w-6 h-6 text-blue-400"
              />
            </div>
            <div className="flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <GearIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center justify-center">
              <Cross2Icon className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
