import { useState, useEffect, useRef } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import AnimeCardLong from "@/src/components/Pages/Home/ui/ListType";

const DraggableList = ({ topAnimes }) => {
	const [sortedLikes, setSortedLikes] = useState(topAnimes);
	const isPastInitialRenderRef = useRef(false);

	const handleDragAndDrop = (results) => {
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

		const updateLikesOrderOnServer = async (updatedLikes) => {
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
			} catch (error) {
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
						{sortedLikes?.map((like, index) => (
							<Draggable key={like.id} draggableId={like.id} index={index}>
								{(provided) => (
									<li
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<AnimeCardLong like={like} index={index} />
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
