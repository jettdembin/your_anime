"use client";

import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import AnimeCardLong from "@/src/components/Pages/Home/ui/ListType";

// A function to reorder the list items
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const DraggableList = ({ likes }) => {
	const [sortedLikes, setSortedLikes] = useState(likes);

	const handleDragAndDrop = (results) => {
		const { source, destination, type } = results;

		if (!destination) return;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;

		if (type === "group") {
			const reorderedStores = [...sortedLikes];

			const storeSourceIndex = source.index;
			const storeDestinatonIndex = destination.index;

			const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
			reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

			return setSortedLikes(reorderedStores);
		}
		const itemSourceIndex = source.index;
		const itemDestinationIndex = destination.index;

		const storeSourceIndex = sortedLikes.findIndex(
			(store) => store.id === source.droppableId
		);
		const storeDestinationIndex = sortedLikes.findIndex(
			(store) => store.id === destination.droppableId
		);

		const newSourceItems = [...sortedLikes[storeSourceIndex].items];
		const newDestinationItems =
			source.droppableId !== destination.droppableId
				? [...sortedLikes[storeDestinationIndex].items]
				: newSourceItems;

		const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
		newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

		const newStores = [...sortedLikes];

		newStores[storeSourceIndex] = {
			...sortedLikes[storeSourceIndex],
			items: newSourceItems,
		};
		newStores[storeDestinationIndex] = {
			...sortedLikes[storeDestinationIndex],
			items: newDestinationItems,
		};

		setSortedLikes(newStores);
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		if (result.destination.index === result.source.index) {
			return;
		}

		const newLikes = reorder(
			sortedLikes,
			result.source.index,
			result.destination.index
		);

		setSortedLikes(newLikes);
	};

	return (
		<DragDropContext onDragEnd={handleDragAndDrop}>
			<Droppable droppableId="likes" type="group">
				{(provided) => (
					<ul {...provided.droppableProps} ref={provided.innerRef}>
						{likes?.slice(0, 10)?.map((like, index) => (
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
