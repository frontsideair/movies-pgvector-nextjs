import { pool, sql, genEmbedding } from "../lib/model.ts";
import fs from "fs/promises";
import { parse } from "csv-parse";

const csvFile = await fs.readFile("./downloads/movies_metadata.csv", {
  encoding: "utf-8",
});

const parser = parse(csvFile, {
  columns: true,
  skipRecordsWithError: true,
});

for await (const record of parser) {
  const year = record.release_date.slice(0, 4);
  const movie = {
    title: record.title,
    year: Number(year),
    href: record.homepage,
    extract: record.overview,
  };
  const embedding = await genEmbedding([movie.extract]);
  await pool.query(sql.typeAlias("void")`
    INSERT INTO movies (title, year, href, extract, embedding)
    VALUES (${movie.title}, ${movie.year}, ${movie.href}, ${movie.extract}, ${embedding});
  `);
}
