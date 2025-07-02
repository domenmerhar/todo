import { Pool, PoolClient } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export const query = async (text: string, params: unknown[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

interface PoolClientWithLastQuery extends PoolClient {
  lastQuery?: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (...args: unknown[]) => any;
}

export const getClient = async () => {
  const client: PoolClientWithLastQuery = await pool.connect();
  const query = client.query;
  const release = client.release;

  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);

  client.query = (...args: unknown[]) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };

  client.release = () => {
    clearTimeout(timeout);

    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};
