import { client } from "../database/client-database.js";


// Récupérer toutes les questions avec infos sur le thème SI ACTIFS
export async function findAllQuestions(activeOnly = true) {
  const query = `
    SELECT 
      questions.*,
      themes.theme_name AS theme_name,
      themes.slug AS theme_slug,
      themes.color AS theme_color
    FROM questions
    JOIN themes ON questions.theme = themes.id
    ${activeOnly ? "WHERE questions.archived = FALSE AND themes.archived = FALSE" : ""}
    ORDER BY questions.id
  `;
  const result = await client.query(query);
  return result.rows;
}


// Récupérer une question par ID 
export async function findQuestionById(id) {
    const result = await client.query(`
        SELECT 
            questions.*,
            themes.theme_name AS theme_name,
            themes.slug AS theme_slug,
            themes.color AS theme_color
        FROM questions
        JOIN themes ON questions.theme = themes.id
        WHERE questions.id = $1
    `, [id]);
    return result.rows[0] ?? null;
}

// Créer une nouvelle question 
export async function createQuestion({ question, response, theme, question_image, response_image, youtube_url, youtube_start, youtube_end }) {
    const result = await client.query(`
        INSERT INTO questions (question, response, theme, question_image, response_image, youtube_url, youtube_start, youtube_end)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `, [question, response, theme, question_image || null, response_image || null, youtube_url || null, youtube_start || null, youtube_end || null]);
    return result.rows[0];
}

// Mettre à jour une question existante 
export async function updateQuestion(id, {   question,
  response,
  theme,
  question_image,
  response_image,
  youtube_url,
  youtube_start,
  youtube_end }) {
    const result = await client.query(`
    UPDATE questions
    SET question = $1,
        response = $2,
        theme = $3,
        question_image = $4,
        response_image = $5,
        youtube_url = $6,
        youtube_start = $7,
        youtube_end = $8
    WHERE id = $9
    RETURNING *
    `, [question,
    response,
    theme,
    question_image || null,
    response_image || null,
    youtube_url || null,
    youtube_start || null,
    youtube_end || null,
    id]);
    return result.rows[0] ?? null;
}

// Supprimer une question 
export async function deleteQuestionById(id) {
    await client.query(`DELETE FROM questions WHERE id = $1`, [id]);
}

// Mettre à jour l'état 'archived' de toutes les questions d'un thème 
export async function archiveQuestionsByTheme(themeId, archivedStatus) {
    await client.query(`
        UPDATE questions
        SET archived = $1
        WHERE theme = $2
    `, [archivedStatus, themeId]);
}


