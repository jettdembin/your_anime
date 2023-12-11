"use client";

import { useEffect, useRef } from "react";

type Props = {
  description: string;
};

export default function HeroDescription({ description }: Props) {
  const animeDescriptionRef = useRef(null);

  useEffect(() => {
    if (animeDescriptionRef?.current) {
      animeDescriptionRef.current.innerHTML = description;
    }
  }, [description]);

  return <p className="text-gray-700" ref={animeDescriptionRef}></p>;
}
