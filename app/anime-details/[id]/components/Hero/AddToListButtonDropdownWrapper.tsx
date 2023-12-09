import { watchOptions } from "@/consts";

type Props = {};

export default function AddToListButtonWrapper({ handleAddToList }: Props) {
  return (
    <>
      <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <button
          tabIndex={0}
          className="w-full py-2 text-center bg-blue-200 rounded-sm cursor-pointer"
        >
          Add to List
        </button>
        <ul
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
        </ul>
      </div>
    </>
  );
}
