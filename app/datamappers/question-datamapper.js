import { client } from "../database/client-database.js";


/* Récupérer toutes les questions avec infos sur le thème */
export async function findAllQuestions() {
    const result = await client.query(`
        SELECT 
            questions.*,
            themes.theme_name AS theme_name,
            themes.slug AS theme_slug,
            themes.color AS theme_color
        FROM questions
        JOIN themes ON questions.theme = themes.id
        ORDER BY questions.id
    `);
    return result.rows;
}

/* Récupérer une question par ID */
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

/* Créer une nouvelle question */
export async function createQuestion({ question, response, theme, question_image }) {
    const result = await client.query(`
        INSERT INTO questions (question, response, theme, question_image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [question, response, theme, question_image || null]);
    return result.rows[0];
}

/* Mettre à jour une question existante */
export async function updateQuestion(id, { question, response, theme, question_image }) {
    const result = await client.query(`
        UPDATE questions
        SET question = $1,
            response = $2,
            theme = $3,
            question_image = $4
        WHERE id = $5
        RETURNING *
    `, [question, response, theme, question_image || null, id]);
    return result.rows[0] ?? null;
}

/* Supprimer une question */
export async function deleteQuestionById(id) {
    await client.query(`DELETE FROM questions WHERE id = $1`, [id]);
}