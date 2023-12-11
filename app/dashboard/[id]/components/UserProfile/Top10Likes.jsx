import DraggableList from "./Top10Likes/DraggableList";

export const dynamic = "force-dynamic";

export default async function Top10Likes({ topAnimes }) {
  debugger;
  return (
    <>
      {/* <h2 className="uppercase text-lg font-semibold text-gray-900 pb-2">
        Your Top 10 Anime 🤩
      </h2> */}
      <DraggableList topAnimes={topAnimes} />
    </>
  );
}
