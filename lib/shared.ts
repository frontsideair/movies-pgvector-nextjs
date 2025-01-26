import { z } from "zod";

export const Movie = z.object({
  id: z.number(),
  imdb_id: z.string(),
  title: z.string(),
  tagline: z.string().optional(),
  overview: z.string().optional(),
  release_date: z.string().optional(),
  vote_average: z.number().optional(),
});

export type Movie = z.infer<typeof Movie>;

export const distanceFunctions = [
  { name: "<->" as const, description: "L2 distance" },
  { name: "<#>" as const, description: "(negative) inner product" },
  { name: "<=>" as const, description: "cosine distance" },
  { name: "<+>" as const, description: "L1 distance" },
];

export type DistanceFunctionName = (typeof distanceFunctions)[number]["name"];

export const distanceFunctionNames = distanceFunctions.map((df) => df.name) as [
  DistanceFunctionName,
  ...DistanceFunctionName[]
];

export const Query = z.object({
  q: z.string().optional().default(""),
  limit: z.enum(["10", "20", "50"]).optional().default("10"),
  distance: z
    .enum(distanceFunctionNames)
    .optional()
    .default(distanceFunctionNames[0]),
});

export type Query = z.infer<typeof Query>;
