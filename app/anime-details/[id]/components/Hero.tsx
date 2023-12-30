import { Media } from "@/types/anime";

import Image from "next/image";
import AddToLikesButtonWrapper from "./Hero/AddToLikesButtonWrapper";
import AddToListButtonWrapper from "./Hero/AddToListButtonDropdownWrapper";
import HeroDescription from "./Hero/HeroDescription";

type Props = {
  anime: Media;
  params: { id: string };
};
// anime: {
//   bannerImage: string;
//   coverImage: {
//     extraLarge: string;
//   };
//   title: {
//     english: string;
//   };
//   description: string;
// };
// };

export default function Hero({ anime, params }: Props) {
  return (
    <div className="relative bg-slate-50">
      <div className="header-wrapper">
        <div
          className="banner w-full h-[210px] md:h-[400px] -mt-12 relative"
          style={{
            background: `url(${
              anime.bannerImage ||
              "https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg"
            })`,
            backgroundSize: `${anime.bannerImage ? "cover" : "contain"}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 35%",
          }}
        >
          <div
            className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
            style={{
              background:
                "linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
            }}
          ></div>
        </div>
      </div>
      <div className="header container max-w-5xl mx-auto">
        <div
          className="container px-4 lg:px-0 gap-7 max-w-6xl flex flex-col md:grid md:grid-cols-anime-details"
          // style={{ gridTemplateColumns: "270px auto" }}
        >
          <div className="w-full flex md:flex-col justify-between md:justify-normal relative -mt-20 md:-mt-32 mx-auto">
            <div className="static shadow-lg">
              <Image
                width={270}
                height={360}
                style={{ position: "relative" }}
                className="w-[100px] md:w-full max-w-[130px] md:max-w-none max-h-[130px] md:max-h-none object-cover rounded-sm shadow-md"
                src={anime.coverImage.extraLarge || ""}
                alt={anime.title.english || ""}
              />
            </div>
            <div className="flex w-full md:w-auto items-end md:my-5 gap-4">
              <AddToListButtonWrapper />
              <AddToLikesButtonWrapper
                params={params}
                english={anime.title.english || ""}
              />
            </div>
          </div>

          <div className="pt-6 pb-4">
            <h2 className="text-3xl mb-2">{anime.title.english}</h2>
            <HeroDescription description={anime?.description || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
