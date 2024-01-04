// "use client";

// import { useState } from "react";

// import { BoxIcon, DashboardIcon, ListBulletIcon } from "@radix-ui/react-icons";

// import { Media } from "@/types/anime";

// import { useSearchParams } from "next/navigation";
// import { useSearchContext } from "./context/SearchContext";
// import { useViewAll } from "./hooks/useViewAll.1";

// import { CardTypeProvider } from "@/context/CardTypeContext";

// import CategoryWidget from "@/app/discover/ui/CategoryWidget";
// import FilterWidget from "@/app/discover/ui/FilterWidget";
// import { AnimeCardLayout } from "@/layout/AnimeCardLayout";
// import AnimeCard from "@/ui/Card/AnimeCard";
// import CardTypeWidgetWrapper from "@/ui/Card/AnimeCard/CardTypeWidget/CardTypeWidgetWrapper";
// import { CardSectionLoader } from "@/ui/LoadingSection";

// export default function Discover() {
//   const searchParams = useSearchParams();

//   // const type = searchParams?.get("page");
//   const searchValue = searchParams?.get("search");
//   const categoryValue = searchParams?.get("category");
//   // const isTrending = searchParams?.get("page") === "trending";

//   const [page, setPage] = useState(1);
//   const [media, setMedia] = useState<Media[]>([]);

//   const { error, loading, data } = useViewAll(1, 50);
//   const { data: searchData }: { data: { Page: { media: Media[] } } } =
//     useSearchContext();

//   if (loading) return <CardSectionLoader />;
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   if (!data) return;

//   const cardType = () =>
//     categoryValue?.toUpperCase() === "TOP_100" ? "list" : "descriptive";
//   return (
//     <CardTypeProvider type={cardType()}>
//       <section className="mt-6 mx-2 md:mx-0">
//         <header className="flex justify-between items-center w-full pb-2">
//           <div className="flex w-full items-center justify-between">
//             {!!searchValue && <FilterWidget />}
//             <CategoryWidget />
//           </div>
//           <hr className="h-10 mx-2 border-x border-y border-gray-800" />
//           <div className="flex gap-2">
//             <CardTypeWidgetWrapper cardType="card">
//               <BoxIcon className="w-4 h-4" />
//             </CardTypeWidgetWrapper>
//             <CardTypeWidgetWrapper cardType="descriptive">
//               <DashboardIcon className="w-4 h-4" />
//             </CardTypeWidgetWrapper>
//             <CardTypeWidgetWrapper cardType="list">
//               <ListBulletIcon className="w-4 h-4" />
//             </CardTypeWidgetWrapper>
//           </div>
//         </header>
//         {!searchValue ? (
//           <AnimeCardLayout>
//             {media.map((media, i) => (
//               <AnimeCard key={i} media={media} index={i} />
//             ))}
//           </AnimeCardLayout>
//         ) : (
//           <AnimeCardLayout>
//             {searchData?.Page?.media?.map((media, i) => (
//               <AnimeCard key={i} media={media} index={i} />
//             ))}
//           </AnimeCardLayout>
//         )}
//       </section>
//     </CardTypeProvider>
//   );
// }
