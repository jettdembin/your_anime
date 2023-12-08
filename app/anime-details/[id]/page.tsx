import { Suspense } from "react";

import { Main } from "./components/Main";

export default function AnimeDetails({
  params,
}: {
  params: { id: string; userId: string };
}) {
  return (
    <Suspense fallback="Loading...">
      <Main params={params} />
    </Suspense>
  );
}
