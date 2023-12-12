import Image from "next/image";

import { Media, Relations } from "@/types/anime";

type Props = {
  anime: Media;
  relations: Relations[];
};

export default function Relations({ anime, relations }: Props) {
  return (
    <section>
      <h3 className="text-base mb-2">Relations</h3>
      <div className="flex flex-col space-y-4">
        {relations?.map((relation, index) => (
          <div
            key={index}
            className="grid bg-white"
            style={{ gridTemplateColumns: "20% auto" }}
          >
            <div>
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-sm" // className="w-full object-cover rounded-sm"
                src={anime.coverImage.extraLarge || ""}
                alt={anime.title.english || "image description"}
              />
            </div>
            <div className="p-4 flex flex-col">
              <h6>Source</h6>
              <p className="mt-1">{relation.title.english}</p>
              <p className="mt-auto">
                {relation.type} - {relation.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
