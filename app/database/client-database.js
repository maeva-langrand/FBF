// j'ai besoin du module pg
import { Client } from "pg";

// je crée et je configure le client
export const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});

// ouvrir la connexion vers la bdd
await client.connect();