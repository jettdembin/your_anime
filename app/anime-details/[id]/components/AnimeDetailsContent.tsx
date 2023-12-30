import { Media } from "@/types/anime";

import AnimeDetailsContentSidebar from "./AnimeDetailsContent/AnimeDetailsContentSidebar";
import Characters from "./AnimeDetailsContent/Characters";
import Relations from "./AnimeDetailsContent/Relations";

type Props = {
  anime: Media;
};

export default function AnimeDetailsContent({ anime }: Props) {
  return (
    <>
      <div
        className="flex flex-col lg:grid gap-10"
        style={{ gridTemplateColumns: "270px auto" }}
      >
        <aside>
          <AnimeDetailsContentSidebar tags={anime?.tags || []} anime={anime} />
        </aside>

        <div>
          <Relations relations={anime?.relations?.nodes} anime={anime} />
          <Characters characters={anime?.characters?.nodes} anime={anime} />
        </div>
      </div>
    </>
  );
}
