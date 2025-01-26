{ pkgs, lib, config, inputs, ... }:

{
  dotenv.enable = true;

  env = {
    POSTGRES_URL = "postgres://127.0.0.1/movies";
  };

  packages = [
    pkgs.kaggle
    pkgs.unzip
  ];

  scripts = {
    download.exec = ''
      kaggle datasets download rounakbanik/the-movies-dataset -f movies_metadata.csv -p downloads;
      unzip downloads/movies_metadata.csv.zip -d downloads;
    '';
    seed.exec = "pnpm run seed";
  };

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_23;
    pnpm.install.enable = true;
  };

  services.postgres = {
    enable = true;
    listen_addresses = "127.0.0.1";
    extensions = extensions: [ extensions.pgvector ];
    initialDatabases = [
      {
        name = "movies";
        schema = ./migrations/0001_schema.sql;
      }
    ];
  };

  processes.dev = {
    exec = "pnpm dev";
    process-compose.depends_on.postgres.condition = "process_healthy";
  };
}
