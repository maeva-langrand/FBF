-- ============================================================
--  CREATION DES TABLES
-- ============================================================

-- Supprimer si déjà présentes
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS themes CASCADE;

-- ------------------------
-- Table : themes
-- ------------------------
CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    theme_name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(20) NOT NULL UNIQUE,
    theme_image VARCHAR(255)
);

-- ------------------------
-- Table : questions
-- ------------------------
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    theme INTEGER NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    response TEXT NOT NULL,
    question_image VARCHAR(255)
);

-- ============================================================
-- INSERTION DES THEMES (SANS ID)
-- ============================================================
INSERT INTO themes (theme_name, slug, color, theme_image) VALUES
('Sciences', 'sciences', '#76af7f', '/img/sciences.png'),
('Histoire', 'histoire', '#c9845a', '/img/histoire.png'),
('Géographie', 'geographie', '#f2b880', '/img/geographie.png'),
('Art', 'art', '#e07b39', '/img/logique.png'),
('Logique', 'logique', '#5c6b73', '/img/logique.png');

-- ============================================================
-- INSERTION DES QUESTIONS (SANS ID)
-- EN UTILISANT LES THEMES DANS L'ORDRE 1→5
-- ============================================================

INSERT INTO questions (theme, question, response, question_image) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Pretium tellus duis.', ''),
(1, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?', 'Ut enim ad minim veniam.', ''),
(1, 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea?', 'Duis aute irure dolor in reprehenderit.', ''),
(1, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt.', ''),
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Pretium tellus duis.', ''),

(2, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem?', 'Accusantium doloremque laudantium.', ''),
(2, 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis?', 'Et quasi architecto beatae vitae dicta sunt explicabo.', ''),
(2, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?', 'Aut odit aut fugit.', ''),
(2, 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?', 'Consectetur, adipisci velit.', ''),
(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed do eiusmod tempor incididunt.', ''),

(3, 'Ut enim ad minim veniam, quis nostrud exercitation?', 'Ullamco laboris nisi ut aliquip.', ''),
(3, 'Duis aute irure dolor in reprehenderit in voluptate velit?', 'Esse cillum dolore eu fugiat nulla pariatur.', ''),
(3, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', ''),
(3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', ''),
(3, 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis?', 'Et quasi architecto beatae vitae dicta sunt explicabo.', ''),

(4, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?', 'Aut odit aut fugit.', ''),
(4, 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?', 'Consectetur, adipisci velit.', ''),
(4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed do eiusmod tempor incididunt.', ''),
(4, 'Ut enim ad minim veniam, quis nostrud exercitation?', 'Ullamco laboris nisi ut aliquip.', ''),
(4, 'Duis aute irure dolor in reprehenderit in voluptate velit?', 'Esse cillum dolore eu fugiat nulla pariatur.', ''),

(5, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', ''),
(5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', ''),
(5, 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis?', 'Et quasi architecto beatae vitae dicta sunt explicabo.', ''),
(5, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?', 'Aut odit aut fugit.', ''),
(5, 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?', 'Consectetur, adipisci velit.', '');

-- Ajout des dernières questions du fichier original
INSERT INTO questions (theme, question, response, question_image) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed do eiusmod tempor incididunt.', ''),
(1, 'Ut enim ad minim veniam, quis nostrud exercitation?', 'Ullamco laboris nisi ut aliquip.', ''),
(1, 'Duis aute irure dolor in reprehenderit in voluptate velit?', 'Esse cillum dolore eu fugiat nulla pariatur.', ''),
(1, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', ''),
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Pretium tellus duis.', ''),

(2, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?', 'Ut enim ad minim veniam.', ''),
(2, 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea?', 'Duis aute irure dolor in reprehenderit.', ''),
(2, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt.', ''),
(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Pretium tellus duis.', ''),
(2, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem?', 'Accusantium doloremque laudantium.', ''),

(3, 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis?', 'Et quasi architecto beatae vitae dicta sunt explicabo.', ''),
(3, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?', 'Aut odit aut fugit.', ''),
(3, 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?', 'Consectetur, adipisci velit.', ''),
(3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed do eiusmod tempor incididunt.', ''),
(3, 'Ut enim ad minim veniam, quis nostrud exercitation?', 'Ullamco laboris nisi ut aliquip.', ''),

(4, 'Duis aute irure dolor in reprehenderit in voluptate velit?', 'Esse cillum dolore eu fugiat nulla pariatur.', ''),
(4, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', ''),
(4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', ''),
(4, 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis?', 'Et quasi architecto beatae vitae dicta sunt explicabo.', ''),
(4, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?', 'Aut odit aut fugit.', ''),

(5, 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?', 'Consectetur, adipisci velit.', ''),
(5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'Sed do eiusmod tempor incididunt.', ''),
(5, 'Ut enim ad minim veniam, quis nostrud exercitation?', 'Ullamco laboris nisi ut aliquip.', ''),
(5, 'Duis aute irure dolor in reprehenderit in voluptate velit?', 'Esse cillum dolore eu fugiat nulla pariatur.', ''),
(5, 'Excepteur sint occaecat cupidatat non proident?', 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', '');



CREATE TABLE parties (
    id SERIAL PRIMARY KEY,
    nom_partie VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT NOW(),
    duree INTERVAL,
    nb_participants INT NOT NULL,
    nb_questions_total INT NOT NULL,
    nb_questions_pref INT NOT NULL,
    etat VARCHAR(50) DEFAULT 'préparée' -- 'préparée', 'en_cours', 'terminee'
);


CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    partie_id INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    theme_pref_id INT NOT NULL REFERENCES themes(id),
    score INT DEFAULT 0,
    ordre INT DEFAULT 1
);


CREATE TABLE cartes (
    id SERIAL PRIMARY KEY,
    partie_id INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
    numero INT NOT NULL,
    theme_id INT REFERENCES themes(id), -- null si question neutre
    question_id INT REFERENCES questions(id),
    participant_id_pref INT REFERENCES participants(id), -- null si question neutre
    couleur_affichage VARCHAR(20), -- couleur du thème ou gris
    etat VARCHAR(20) DEFAULT 'grise', -- 'grise', 'visible', 'jouee'
    points INT -- points obtenus pour cette carte
);


CREATE TABLE archives_parties (
    id SERIAL PRIMARY KEY,
    nom_partie VARCHAR(255),
    date_creation TIMESTAMP,
    duree INTERVAL,
    classement JSONB -- [{participant: "Alice", score: 12, theme_pref: "Histoire"}, ...]
);