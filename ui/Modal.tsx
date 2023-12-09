type Props = { children: React.ReactNode; id: string };

export default function Modal({ children, id }: Props) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">{children}</div>
    </dialog>
  );
}
