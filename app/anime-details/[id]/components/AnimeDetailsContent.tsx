import { Media } from "@/types/anime";

import AnimeDetailsContentSidebar from "./AnimeDetailsContent/AnimeDetailsContentSidebar";
import Relations from "./AnimeDetailsContent/Relations";
import Characters from "./AnimeDetailsContent/Characters";

type Props = {
  anime: Media;
};

export default function AnimeDetailsContent({ anime }: Props) {
  return (
    <>
      <div
        className="grid gap-10"
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
