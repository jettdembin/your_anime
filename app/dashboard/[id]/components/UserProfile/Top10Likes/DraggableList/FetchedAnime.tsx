import ContentLoader from "react-content-loader";

import { useAnimeDetails } from "@/graphql/queries";

import ListType from "@/ui/AnimeCard/ListType";

type Props = {
  id: number | null;
  index: number;
};

export default function FetchedAnime({ id, index }: Props) {
  const { error, loading, data } = useAnimeDetails(Number(id) || null);

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <>
      <ListType anime={data?.Media} index={index} />
    </>
  );
}
