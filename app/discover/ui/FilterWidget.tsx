"use client";

import { useSearchParams } from "next/navigation";

const FilterWidget = () => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("search") || "";
  const page = searchParams?.get("page") || "";

  // const [searchValue, setSearchValue] = useState(search);
  return (
    <div
      className={`btn btn-active btn-neutral shadow rounded-md p-2 text-xs text-slate-100`}
    >
      <p className="font-semibold text-sm text-white">Search: {search}</p>
    </div>
  );
};

export default FilterWidget;
