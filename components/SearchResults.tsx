import { SearchResult } from "@/components/SearchResult";
import type { Movie } from "@/lib/shared";

type Props = {
  movies: readonly Movie[];
};

export function SearchResults({ movies }: Props) {
  return (
    <>
      <style>{`
        main p {
          padding: 1rem;
          text-align: center;
        }
        main ul {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 1rem;
        }
        main li {
          border: 1px solid black;
          border-radius: 0.5rem;
          padding: 1rem;
        }
      `}</style>
      {movies.length === 0 ? (
        <p>Search something!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <SearchResult movie={movie} key={movie.id} />
          ))}
        </ul>
      )}
    </>
  );
}
