import { getMovies } from "@/lib/model";
import { Query } from "@/lib/shared";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { q, limit, distance } = Query.parse(await searchParams);
  const query = q.trim();
  const movies = await getMovies(query, Number(limit), distance);

  return (
    <>
      <style href="body" precedence="default">{`
        body {
          max-width: 80ch;
          margin: 0 auto;
          padding: 1rem;
        }
        footer nav ul {
          padding: 0;
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }
      `}</style>
      <header>
        <h1>
          <a href="/">Semantic Movies</a>
        </h1>
        <SearchForm q={query} limit={limit} distance={distance} />
      </header>
      <main>
        <SearchResults movies={movies} />
      </main>
      <footer>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/frontsideair/movies-pgvector-nextjs"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://kaggle.com/datasets/rounakbanik/the-movies-dataset"
                target="_blank"
              >
                Kaggle
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
