CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    imdb_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    tagline TEXT,
    overview TEXT,
    release_date DATE,
    vote_average FLOAT,
    embedding vector(384)
);
