import AnimeCard from "../components/AnimeCard";

export type Anime = {
  id: string;
  attributes: {
    canonicalTitle: string;
    popularityRank: number;
    startDate: string;
    endDate: string;
    posterImage: {
      tiny?: string;
      medium?: string;
    };
  };
  handleAddToFavorites: (attributes: {}) => void;
};
