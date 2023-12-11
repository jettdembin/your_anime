// utils/format.ts
import { DateProps } from "../types/anime";

export function formatGenres(genres: string[] | undefined): string {
  if (!genres) return "";
  return genres.join(", ");
}

export function formatMediaType(mediaType: string | undefined): string {
  if (!mediaType) return "";
  switch (mediaType) {
    case "TV":
      return "TV Series";
    case "MOVIE":
      return "Movie";
    default:
      return mediaType;
  }
}

export const formatDate = (fuzzyDate: any, format = "default"): string => {
  if (!fuzzyDate) return "";
  const { year, month, day } = fuzzyDate;

  if (format === "seasonYear") {
    const seasons = ["Winter", "Spring", "Summer", "Fall"];

    if (!year || !month) {
      return "Unknown";
    }

    const seasonIndex = Math.floor((month - 1) / 3);
    return `${seasons[seasonIndex]} ${year}`;
  }

  if (!year || !month || !day) {
    return "Unknown";
  }

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
