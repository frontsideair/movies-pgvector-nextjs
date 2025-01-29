import type { Movie } from "@/lib/shared";

type Props = {
  movie: Movie;
};

export function SearchResult({ movie }: Props) {
  return (
    <li>
      <style href="search-result" precedence="default">{`
        main dl {
          display: grid;
          grid-template-columns: max-content 1fr;
        }
      `}</style>
      <dl>
        <dt>Title</dt>
        <dd>
          <a href={`https://imdb.com/title/${movie.imdb_id}`} target="_blank">
            {movie.title}
          </a>
        </dd>
        <dt>Tagline</dt>
        <dd>{movie.tagline}</dd>
        <dt>Overview</dt>
        <dd>{movie.overview}</dd>
        <dt>Release Date</dt>
        <dd>{movie.release_date}</dd>
        <dt>Vote Average</dt>
        <dd>{movie.vote_average}</dd>
      </dl>
    </li>
  );
}
