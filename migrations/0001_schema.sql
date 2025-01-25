-- SQL script to create tables for movie database

CREATE EXTENSION IF NOT EXISTS vector;

-- Table for movies
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    year INTEGER,
    href TEXT,
    extract TEXT,
    thumbnail TEXT,
    thumbnail_width INTEGER,
    thumbnail_height INTEGER,
    embedding vector(384)
);
