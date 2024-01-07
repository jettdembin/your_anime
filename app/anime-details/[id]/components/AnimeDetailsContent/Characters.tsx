import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { noImg } from "@/consts";

type Character = {
  role: string;
  voiceActors: Array<{
    id: string;
    name: { full: string };
    image: { large: string };
  }>;
  node: {
    id: string;
    image: { large: string };
    name: { full: string };
    description: string;
  };
};

type Props = {
  characters: Array<Character>;
  anime: {
    coverImage: { extraLarge: string };
    title: { english: string };
  };
};

export default function Characters({ characters, anime }: Props) {
  const search = useSearchParams() || null;
  const type: any = search?.get("type") || "ANIME";
  return (
    <section>
      <h3 className="mt-8 text-sm font-semibold text-slate-600 mb-2 lg:mt-6">
        Characters
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 lg:gap-8">
        {characters?.map((character, index: number) => (
          <div
            key={character?.node?.name?.full + index}
            className="h-24 grid bg-white rounded-sm shadow-md"
            style={
              type === "ANIME"
                ? { gridTemplateColumns: "5rem auto 5rem" }
                : { gridTemplateColumns: "5rem auto" }
            }
          >
            <div className="relative w-20">
              <Image
                fill
                sizes="(max-width: 1200px) 100%"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="max-h-24 rounded-sm"
                src={character.node.image.large || noImg}
                alt={character.node.name.full}
              />
            </div>
            <div className="p-4 flex flex-col justify-between gap-4 overflow-y-hidden hover:overflow-y-auto">
              <div className="flex flex-col flex-wrap gap-[1px]">
                <p className="text-xxs text-slate-500">
                  {character.role.slice(0, 1) +
                    character.role.slice(1).toLowerCase()}
                </p>
                <p className="text-sm  text-slate-800">
                  {character.node.name.full}
                </p>
              </div>
              <p className="text-xs text-slate-600">
                {character.node.description || "No description... yet!"}
              </p>
            </div>
            {type === "ANIME" && (
              <div className="relative w-20">
                <Image
                  fill
                  sizes="(max-width: 1200px) 100%"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="max-h-24 rounded-sm"
                  // src={anime.coverImage.extraLarge}
                  src={character?.voiceActors[0]?.image?.large || noImg}
                  alt={anime.title.english}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
