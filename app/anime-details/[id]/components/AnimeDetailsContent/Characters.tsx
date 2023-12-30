import Image from "next/image";

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
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-600 mb-2 lg:mt-6">
        Characters
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 lg:gap-8">
        {characters?.map((character, index) => (
          <div
            key={index}
            className="h-24 grid bg-white rounded-sm"
            style={{ gridTemplateColumns: "5rem auto 5rem" }}
          >
            <div className="relative w-20">
              <Image
                fill
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="max-h-24 rounded-sm"
                src={character.node.image.large}
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
            <div className="relative w-20">
              <Image
                fill
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="max-h-24 rounded-sm"
                // src={anime.coverImage.extraLarge}
                src={character?.voiceActors[0]?.image?.large || ""}
                alt={anime.title.english}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
