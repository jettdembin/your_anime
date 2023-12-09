type Props = { children: React.ReactNode };

export default function Modal({ children }: Props) {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">{children}</div>
    </dialog>
  );
}
