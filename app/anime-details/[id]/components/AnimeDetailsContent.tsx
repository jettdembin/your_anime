import Modal from "@/components/ui/Modal";
import RatingForm from "./AnimeDetailsContent/RatingForm";
import AnimeDetailsContentSidebar from "./AnimeDetailsContent/AnimeDetailsContentSidebar.tsx";
import Relations from "./AnimeDetailsContent/Relations";
import Characters from "./AnimeDetailsContent/Characters";

type Props = {};

export default function AnimeDetailsContent({ anime }: Props) {
  return (
    <>
      <Modal>
        <RatingForm />
      </Modal>
      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "270px auto" }}
      >
        <aside>
          <AnimeDetailsContentSidebar tags={anime?.tags} anime={anime} />
        </aside>

        <section>
          <Relations relations={anime?.relations?.nodes} anime={anime} />
          <Characters characters={anime?.characters?.nodes} anime={anime} />
        </section>
      </div>
    </>
  );
}
