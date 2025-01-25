# Movies example with Next.js and pgvector

This project is managed by `devenv`. [^1] It consists of a Next.js [^2] application and a Postgres database with the `pgvector` [^3] extension installed. The query uses the L2 distance `<->` to calcualate similarity.

The movie dataset [^4] is fetched from Kaggle with the `download` script from `devenv`. To download the dataset, you need to set `KAGGLE_USERNAME` and `KAGGLE_API_KEY` environment variables.

The `seed` script inserts the data with generated `gte-small` [^5] embeddings into the database. It takes about 12 minutes on my M2 MacBook Air and the database size is around 200 MB.

[^1]: https://devenv.sh
[^2]: https://nextjs.org
[^3]: https://github.com/pgvector/pgvector
[^4]: https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset?resource=download&select=movies_metadata.csv
[^5]: https://huggingface.co/Supabase/gte-small
