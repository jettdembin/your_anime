import { useAnimeDetails } from "@/graphql/queries";
import ListType from "@/ui/AnimeCard/ListType";
import React from "react";
import ContentLoader from "react-content-loader";

type Props = {
  id: number;
  index: number;
};

export default function FetchedAnime({ id, index }: Props) {
  if (!id) return <ContentLoader />;

  const { error, loading, data } = useAnimeDetails(id);

  if (loading) {
    return <ContentLoader />;
  }

  if (data) {
    console.log(data);
  }

  return (
    <>
      <ListType anime={data?.Media} index={index} />
    </>
  );
}
