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