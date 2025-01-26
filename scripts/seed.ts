import { connect, sql, genEmbedding } from "../lib/model.ts";
import { batch } from "../lib/batch.ts";
import fs from "fs/promises";
import { parse } from "csv-parse";

const csvFile = await fs.readFile("./downloads/movies_metadata.csv", {
  encoding: "utf-8",
});

const parser = parse(csvFile, {
  columns: true,
  skipRecordsWithError: true,
});

const batchedParser = batch(parser, 4);

function parseJsonArray(json: string) {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

const pool = await connect();

async function parseRecord(record: any) {
  try {
    const title = record.title;
    const tagline = record.tagline;
    const overview = record.overview;
    const releaseDate = record.release_date || null;
    const genres = parseJsonArray(record.genres).map(
      (genre: any) => genre.name
    );
    const imdbId = record.imdb_id;
    const voteAverage = Number(record.vote_average);
    const productionCompanies = parseJsonArray(record.production_companies).map(
      (company: any) => company.name
    );
    const embedding = await genEmbedding([
      `
      Title: ${record.title}
      Tagline: ${tagline}
      Overview: ${record.overview}
      Release date: ${releaseDate}
      Genres: ${genres.join(", ")}
      Production companies: ${productionCompanies.join(", ")}
    `,
    ]);

    return {
      title,
      tagline,
      overview,
      releaseDate,
      genres,
      imdbId,
      voteAverage,
      productionCompanies,
      embedding,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

for await (const records of batchedParser) {
  try {
    const parsedRecords = (await Promise.all(records.map(parseRecord))).filter(
      (record) => record !== null
    );

    await Promise.all(
      parsedRecords.map((record) =>
        pool.query(sql.typeAlias("void")`
          INSERT INTO movies (imdb_id, title, tagline, overview, release_date, vote_average, embedding)
          VALUES (${record.imdbId}, ${record.title}, ${record.tagline}, ${record.overview}, ${record.releaseDate}, ${record.voteAverage}, ${record.embedding})
        `)
      )
    );
  } catch (e) {
    console.error(e);
  }
}
