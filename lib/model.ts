import { createPool, createSqlTag } from "slonik";
import { z } from "zod";

import { pipeline } from "@xenova/transformers";

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

export const MovieInsert = z.object({
  title: z.string(),
  year: z.coerce.number(),
  href: z.string(),
  extract: z.string(),
});

const Movie = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number().optional(),
  href: z.string().optional(),
  extract: z.string().optional(),
});

export const pool = await createPool("postgres://127.0.0.1/movies");

export const sql = createSqlTag({
  typeAliases: {
    id: z.object({
      id: z.number(),
    }),
    void: z.object({}).strict(),
  },
});

export async function getMovies(query: string) {
  const embedding = await genEmbedding([query]);
  const movies = await pool.query(
    sql.type(Movie)`
    SELECT id, title, year, href, extract
    FROM movies
    ORDER BY embedding <-> ${embedding}
    LIMIT 10;`
  );

  return movies.rows;
}
