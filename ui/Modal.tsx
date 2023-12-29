import { useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";

type Props = { children: React.ReactNode; id: string; className?: string };

export default function Modal({ children, id, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Listens to user click to close div if button click not contained in div
  useClickOutside(ref, () => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    if (dialog) {
      dialog.close();
    }
  });

  return (
    <dialog id={id} className="modal">
      <div className={`modal-box ${className}`} ref={ref}>
        {children}
      </div>
    </dialog>
  );
}
