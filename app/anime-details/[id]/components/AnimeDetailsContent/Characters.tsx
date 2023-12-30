import Image from "next/image";

type Props = {
  characters: Array<{
    image: { large: string };
    name: { full: string };
    description: string;
  }>;
  anime: {
    coverImage: { extraLarge: string };
    title: { english: string };
  };
};

export default function Characters({ characters, anime }: any) {
  return (
    <section>
      <h3 className="text-base mb-2">Characters</h3>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 lg:gap-8">
        {characters?.map((character: any, index: number) => (
          <div
            key={index}
            className="h-24 grid bg-white"
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
                // className="w-full h-full object-cover rounded-sm"
                src={character.image.large}
                alt={character.image.large}
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <p className="text-xs text-gray-600">{character.name.full}</p>
              <p className="text-xs text-gray-600">{character.name.full}</p>
            </div>
            <div className="relative w-20">
              <Image
                fill
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="max-h-24 rounded-sm"
                // className="w-full h-full object-cover rounded-sm"
                src={anime.coverImage.extraLarge}
                alt={anime.title.english}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
