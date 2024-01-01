import Image from "next/image";

import { Media } from "@/types/anime";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  anime: Media;
  relations: any;
};

export default function Relations({ anime, relations }: Props) {
  return (
    <section>
      <h3 className="text-sm mt-8 lg:mt-0 font-semibold text-slate-600 mb-2">
        Relations
      </h3>

      <div className="flex lg:flex-col lg:grid lg:grid-cols-2 overflow-auto gap-4  pb-1">
        {relations?.map((relation: any, index: number) => (
          <Link
            href={`/anime-details/${relation?.id}?type=${relation.type}`}
            key={relation.id}
          >
            <div
              key={index}
              className="grid  bg-white shadow-md h-[6rem] rounded-sm max-w-[400px] min-w-[400px] lg:max-w-[auto] lg:min-w-[auto] overflow-hidden hover:overflow-auto"
              style={{ gridTemplateColumns: "5rem auto" }}
            >
              <div className="relative w-20">
                <Image
                  fill
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="h-full rounded-sm"
                  src={relation.coverImage.large || ""}
                  alt={anime.title.english || "image description"}
                />
              </div>
              <div className="p-4 flex flex-col">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-xxs text-[#3CB4F1]">
                    {relation.type}
                  </p>

                  <h6 className="text-sm">
                    {relation.title.english ||
                      relation.title.romaji ||
                      relation.title.userPreferred}
                  </h6>
                </div>
                <p className="flex gap-[1px] font-light text-xs mt-auto text-slate-500">
                  {relation.type.slice(0, 1) +
                    relation.type.slice(1).toLowerCase()}{" "}
                  <span className="flex items-center">
                    <DotFilledIcon className="w-2 h-2" />
                  </span>
                  {relation.status.slice(0, 1) +
                    relation.status.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
