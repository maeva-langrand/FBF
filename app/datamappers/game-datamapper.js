import { client } from "../database/client-database.js";

export const gameDatamapper = {
  async createGame(name) {
    const result = await client.query(
      "INSERT INTO games (name, created_at) VALUES ($1, NOW()) RETURNING *",
      [name]
    );
    return result.rows[0];
  },

  async addPlayer(gameId, player) {
    const result = await client.query(
      "INSERT INTO game_players (game_id, name, preferred_theme, score) VALUES ($1,$2,$3,$4) RETURNING *",
      [gameId, player.name, player.preferred_theme, player.score || 0]
    );
    return result.rows[0];
  },

  async addPlayedCard(gameId, card, playerId = null) {
    const result = await client.query(
      "INSERT INTO played_cards (game_id, question_id, player_id, points) VALUES ($1,$2,$3,$4) RETURNING *",
      [gameId, card.id, playerId, card.points || 0]
    );
    return result.rows[0];
  }
};



export async function insertGameArchive(entry) {
  const { name, players, scores } = entry;
  const date_played = new Date(); // on crée la date ici

  await client.query(
    `INSERT INTO game_archive (name, date, players, scores)
     VALUES ($1, $2, $3, $4)`,
    [name, date_played, JSON.stringify(players), JSON.stringify(scores)]
  );
}

// ---- create game
export async function insertGame(name) {
  const { rows } = await client.query(
    `INSERT INTO games (name, created_at)
     VALUES ($1, NOW())
     RETURNING id, name, created_at`,
    [name]
  );
  return rows[0];
}

// ---- add players / scores
export async function insertGamePlayers(gameId, players) {
  for (const p of players) {
    await client.query(
      `INSERT INTO game_players (game_id, name, preferred_theme, score)
       VALUES ($1,$2,$3,$4)`,
      [gameId, p.name, p.theme, p.score]
    );
  }
}

// ----------------- FETCH ARCHIVES -----------------
export async function findAllArchivedGames() {
  const result = await client.query(`
    SELECT 
      g.id,
      g.name,
      g.created_at AS date,
      json_agg(
        json_build_object(
          'name', gp.name,
          'score', gp.score
        ) ORDER BY gp.score DESC
      ) AS players
    FROM games g
    JOIN game_players gp ON gp.game_id = g.id
    GROUP BY g.id
    ORDER BY g.created_at DESC
  `);

  return result.rows.map(game => ({
    ...game,
    participants: game.players.map(p => p.name).join(", ")
  }));
}