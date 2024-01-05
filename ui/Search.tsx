"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  SearchProvider,
  useSearchContext,
} from "@/app/discover/context/SearchContext";
import { ContentContainer } from "@/layout/ContentContainer";
// Define a type for the category
type Category = {
  label: string;
  value: string;
};

export default function Search() {
  const navRef = useRef<HTMLInputElement>(null);
  const { searchValues, setSearchValues, handleSearch } = useSearchContext();
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const router: any = useRouter();
  const searchParams = useSearchParams();

  const categoryValue = searchParams?.get("category");

  useEffect(() => {
    if (!!searchParams?.get("search")) {
      setSearchValues((prev: any) => ({
        ...prev,
        search: searchParams?.get("search"),
      }));
    }
  }, []);

  useEffect(() => {
    if (!!navRef.current) navRef.current.focus();

    // let goToHome: any;
    // if (!searchValues?.search) {
    //   goToHome = setTimeout(() => {
    //     router.push("/", undefined, {
    //       shallow: true,
    //     });
    //   }, 2000);
    // }

    // return () => {
    //   clearTimeout(goToHome);
    // };
  }, [searchValues, router]);

  return (
    <section className="px-8 sm:px-0  md:mx-0 md:px-8 lg:mt-40 mb-8">
      <SearchProvider>
        <ContentContainer>
          {/* <form onSubmit={() => {}}> */}
          <div className="">
            <h3 className="pb-4 text-3xl font-semibold text-gray-900">
              Browse
            </h3>
          </div>
          <div className="flex gap-8 mb-6">
            <input
              ref={navRef}
              className="w-full px-6 py-4 shadow-custom focus:outline-none bg-white rounded-sm"
              placeholder="Search for anime..."
              type="text"
              name="search"
              value={searchValues["search"] || ""}
              onChange={handleSearch}
            />
            {/* <button
            className="py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white border-none shadow-custom"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <span className="material-icons text-gray-800">menu</span>
          </button> */}
            {/* {isFilterVisible && (
						<div
							ref={filterRef}
							className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
						>
							<Filter
								isOpen={openedSelect === isFilterVisible}
								onToggle={() =>
									setOpenedSelect((prev) =>
										prev === "filter" ? null : "filter"
									)
								}
							/>
						</div>
					)} */}
          </div>

          {/* </form> */}
        </ContentContainer>
      </SearchProvider>
    </section>
  );
}

// {!!isFilterVisible && (
// 	<div className="w-full flex gap-6">
// 		{selectData.map((select, i) => (
// 			<SelectWrapper
// 				key={i}
// 				isOpen={openedSelect === i}
// 				onToggle={() =>
// 					setOpenedSelect((prev) => (prev === i ? null : i))
// 				}
// 				options={select.options}
// 				label={select.label}
// 				onChange={handleChange}
// 				value={searchValues[select.options[0].parent]}
// 			/>
// 		))}

// 		<div>{/* <button type="submit"></button> */}</div>
// 	</div>
// )}
