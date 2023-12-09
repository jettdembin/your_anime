"use client";

import { useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";

type Props = { children: React.ReactNode; id: string };

export default function Modal({ children, id }: Props) {
  const ref = useRef(null);

  //listens to user click to close div if button click not contained in div
  useClickOutside(ref, () => {
    document.getElementById(`${id}`).close();
  });

  return (
    <dialog id={id} className="modal">
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </dialog>
  );
}
