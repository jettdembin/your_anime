import DraggableList from "./Top10Likes/DraggableList";

export default function Top10Likes({ likes, topAnimes }) {
  return (
    <>
      <h2 className="uppercase text-lg font-semibold text-gray-900 pb-2">
        Your Top 10 Anime 🤩
      </h2>
      <DraggableList topAnimes={topAnimes} />
    </>
  );
}
