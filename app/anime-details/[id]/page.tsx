import { Main } from "./components/Main";

export default function AnimeDetails({
  params,
}: {
  params: { id: string; userId: string };
}) {
  return <Main params={params} />;
}
