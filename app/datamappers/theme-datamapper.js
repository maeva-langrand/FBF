import { client } from "../database/client-database.js";

// Récupérer tous les thèmes actifs
export async function findAllThemes(activeOnly = true) {
  const query = activeOnly
    ? `SELECT * FROM themes WHERE archived = FALSE ORDER BY "theme_name" ASC`
    : `SELECT * FROM themes ORDER BY "theme_name" ASC`;

  const result = await client.query(query);
  return result.rows;
}

// Récupérer un thème par ID
export async function findThemeById(id) {
 const result = await client.query(`SELECT * FROM themes WHERE id = $1`, [id]);
  const theme = result.rows.length === 1 ? result.rows[0] : null;
  return theme;
}

// Créer un nouveau thème
export async function createTheme({theme_name, slug, color, theme_image}) {
  const query = `
  INSERT INTO themes (theme_name, slug, color, theme_image)
  VALUES ($1, $2, $3, $4)
  RETURNING *`;
const values = [theme_name, slug, color, theme_image || null];

const result = await client.query(query, values);
return result.rows[0];
}

// Mettre à jour un thème existant
export async function updateTheme(id, { theme_name, slug, color, theme_image, archived }) {
    const result = await client.query(`
        UPDATE themes
        SET 
            theme_name = COALESCE($1, theme_name),
            slug = COALESCE($2, slug),
            color = COALESCE($3, color),
            theme_image = COALESCE($4, theme_image),
            archived = COALESCE($5, archived)
        WHERE id = $6
        RETURNING *
    `, [theme_name, slug, color, theme_image, archived, id]);

    return result.rows[0] ?? null;
}


// Archiver un thème
export async function setThemeArchived(id, archived) {
  await client.query(
    `UPDATE themes SET archived = $1 WHERE id = $2`,
    [archived, id]
  );
    // Archiver toutes les questions liées
    await client.query(
      `UPDATE questions SET archived = $1 WHERE theme = $2`,
      [archived, id]
    );
}