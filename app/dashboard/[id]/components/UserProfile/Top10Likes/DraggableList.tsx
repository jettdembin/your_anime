import { useState, useEffect, useRef } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

// import AnimeCard from "@/ui/AnimeCard";
// import ListType from "@/ui/AnimeCard/ListType";
import FetchedAnime from "./DraggableList/FetchedAnime";

const DraggableList = ({ topAnimes }: any) => {
  const [sortedLikes, setSortedLikes] = useState(topAnimes);
  const isPastInitialRenderRef = useRef(false);

  const handleDragAndDrop = (results: any) => {
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const reorderedLikes = [...sortedLikes];
    const [reorderedItem] = reorderedLikes.splice(source.index, 1);
    reorderedLikes.splice(destination.index, 0, reorderedItem);

    setSortedLikes(reorderedLikes);
  };

  useEffect(() => {
    let ignore = false;

    const updateLikesOrderOnServer = async (updatedLikes: any) => {
      const toastId = toast.loading("Updating ranking...");

      try {
        const response = await fetch(`/api/postRanking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: updatedLikes,
            userId: updatedLikes[0].userId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          toast.update(toastId, {
            render: `${data.message}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          return data;
        } else {
          throw new Error("Server responded with an error!");
        }
      } catch (error: any) {
        console.error("Error updating likes order:", error);
        toast.update(toastId, {
          render: `Error: ${error.message || "Failed to update ranking"}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    };

    if (!ignore && isPastInitialRenderRef.current) {
      updateLikesOrderOnServer(sortedLikes);
    }

    return () => {
      ignore = true;
      isPastInitialRenderRef.current = true;
    };
  }, [sortedLikes]);

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Droppable droppableId="likes" type="group">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {sortedLikes?.slice(0, 10)?.map((like: any, index: number) => (
              <Draggable key={like.id} draggableId={like.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FetchedAnime
                      id={Number(like?.animeId) || null}
                      index={index}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
