import { client } from "../database/client-database.js";

// Récupérer tous les thèmes
export async function findAllThemes() {
  const result = await client.query(`SELECT * FROM themes ORDER BY id`);
  const themes = result.rows;
  return themes;
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
export async function updateTheme(id, { theme_name, slug, color, theme_image }) {
    const result = await client.query(
        `UPDATE themes
         SET theme_name = $1,
             slug = $2,
             color = $3,
             theme_image = $4
         WHERE id = $5
         RETURNING *`,
        [theme_name, slug, color, theme_image || null, id]
    );
    return result.rows[0] ?? null;
}