import { createPool, createSqlTag } from "slonik";
import { z } from "zod";

import { pipeline } from "@xenova/transformers";
import { Movie, type DistanceFunctionName } from "@/lib/shared";

const generateEmbedding = await pipeline(
  "feature-extraction",
  "Supabase/gte-small"
);

export async function genEmbedding(texts: string[]) {
  const { data } = await generateEmbedding(texts, {
    pooling: "mean",
    normalize: true,
  });

  return sql.fragment`${sql.array(
    Array.from(data),
    sql.fragment`real[]`
  )}::vector`;
}

export const pool = await createPool("postgres://127.0.0.1/movies");

export const sql = createSqlTag({
  typeAliases: {
    id: z.object({
      id: z.number(),
    }),
    void: z.object({}).strict(),
  },
});

async function getOrderByFragment(
  query: string,
  distanceFunction: DistanceFunctionName
) {
  const embedding = await genEmbedding([query]);
  switch (distanceFunction) {
    case "<->":
      return sql.fragment`ORDER BY embedding <-> ${embedding}`;
    case "<#>":
      return sql.fragment`ORDER BY embedding <#> ${embedding}`;
    case "<=>":
      return sql.fragment`ORDER BY embedding <=> ${embedding}`;
    case "<+>":
      return sql.fragment`ORDER BY embedding <+> ${embedding}`;
  }
}

export async function getMovies(
  query: string,
  limit: number,
  distanceFunction: DistanceFunctionName
) {
  if (!query) {
    return [];
  }
  const orderBy = await getOrderByFragment(query, distanceFunction);
  const movies = await pool.query(
    sql.type(Movie)`
    SELECT id, imdb_id, title, tagline, overview, release_date, vote_average
    FROM movies
    ${orderBy}
    LIMIT ${limit};`
  );

  return movies.rows;
}
