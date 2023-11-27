"use client";

import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

import useCardType from "../../hooks/useCardType";

const LayoutOptionWidget = () => {
	const { cardType, setCardType, handleCardType } = useCardType();

	return (
		<div className="flex gap-2">
			<i onClick={() => handleCardType("card")}>icon</i>
			<i onClick={() => handleCardType("descriptive")}>icon</i>
			<i onClick={() => handleCardType("list")}>icon</i>
		</div>
	);
};

export default LayoutOptionWidget;
