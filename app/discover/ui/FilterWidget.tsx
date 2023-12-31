"use client";

import { useSearchParams } from "next/navigation";

const FilterWidget = () => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const page = searchParams?.get("page") || "";

  // const [searchValue, setSearchValue] = useState(search);
  return (
    <div
      className={`ml-1 lg:ml-0 p-2 text-xs ${
        search ? "bg-sky-400" : ""
      } rounded-md`}
    >
      <h6 className="font-semibold text-white">Search: {search}</h6>
    </div>
  );
};

export default FilterWidget;
