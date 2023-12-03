"use client";

import { useRef, useEffect } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useAuthContext } from "@/context/AuthContext";
import { useAnimeDetails } from "@/graphql/queries";

import Hero from "@/app/anime-details/[id]/components/Hero";
import AnimeDetailsContent from "./components/AnimeDetailsContent";

export default function AnimeDetails({
  params,
}: {
  params: { id: string; userId: string };
}) {
  const { error, loading, data } = useAnimeDetails(params.id);

  const anime = data?.Media;
  const { title } = anime || {};
  const { english } = title || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <header>
        <Hero
          handleAddToList={handleAddToList}
          anime={anime}
          ref={animeDescriptionRef}
        />
      </header>
      <div className="bg-slate-200">
        <main className="container mx-auto py-6">
          <AnimeDetailsContent
            handleAddToLikes={handleAddToLikes}
            anime={anime}
          />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
