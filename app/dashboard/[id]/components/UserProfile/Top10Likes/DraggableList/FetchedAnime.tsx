import { useAnimeDetails } from "@/graphql/queries";
import ListType from "@/ui/AnimeCard/ListType";
import ContentLoader from "react-content-loader";

type Props = {
  id: number;
  index: number;
};

export default function FetchedAnime({ id, index }: Props) {
  const { error, loading, data } = useAnimeDetails(id);

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <>
      <ListType anime={data?.Media} index={index} />
    </>
  );
}
