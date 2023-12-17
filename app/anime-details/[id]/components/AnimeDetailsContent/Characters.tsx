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

      <div className="grid grid-cols-2 gap-8">
        {characters?.map((character: any, index: number) => (
          <div
            key={index}
            className="grid bg-white"
            style={{ gridTemplateColumns: "20% auto 20%" }}
          >
            <div className="relative">
              <Image
                fill
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="rounded-sm"
                // className="w-full h-full object-cover rounded-sm"
                src={character.image.large}
                alt={character.image.large}
              />
            </div>
            <div className="p-4 flex flex-col">
              <h6>Source</h6>
              <p className="mt-1">{character.name.full}</p>
              {/* <p className="mt-auto">{character.description}</p> */}
              <p className="mt-auto">
                {character.name.full} - {character.name.full}
              </p>
            </div>
            <div className="relative">
              <Image
                fill
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                className="rounded-sm"
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
