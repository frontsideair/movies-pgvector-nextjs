import { getMovies } from "@/lib/model";
import { z } from "zod";

const Query = z.string().optional().default("");

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = Query.parse((await searchParams).q);
  const movies = await getMovies(query);

  return (
    <main>
      <h1>Movies</h1>
      <search>
        <form>
          <label>
            <div>Find a Movie</div>
            <input type="search" name="q" defaultValue={query} />
          </label>
          <button type="submit">Search</button>
        </form>
      </search>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={movie.href}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
