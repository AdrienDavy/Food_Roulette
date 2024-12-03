-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS food_roulette;

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS food_roulette;
USE food_roulette;

-- Supprimer les tables si elles existent dans le bon ordre
DROP TABLE IF EXISTS ingredient_quantities;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS ingredient_types;
DROP TABLE IF EXISTS seasons;

-- Création des tables
CREATE TABLE seasons (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name ENUM('printemps', 'été', 'automne', 'hiver', "toute l'année") NOT NULL
);

CREATE TABLE ingredient_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE units (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    abbreviation VARCHAR(10) NOT NULL
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image TEXT,
    type_id INTEGER,
    season_id INTEGER,
    has_ingredient BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (type_id) REFERENCES ingredient_types(id),
    FOREIGN KEY (season_id) REFERENCES seasons(id)
);

-- Ajouter des index sur type_id et season_id pour améliorer les performances des jointures
CREATE INDEX idx_ingredients_type_id ON ingredients (type_id);
CREATE INDEX idx_ingredients_season_id ON ingredients (season_id);

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    season_id INTEGER,
    preparation TEXT NOT NULL,
    cook_time INTEGER,
    tags TEXT,
    image TEXT,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (season_id) REFERENCES seasons(id)
);

-- Ajouter un index sur season_id pour les recherches de recettes par saison
CREATE INDEX idx_recipes_season_id ON recipes (season_id);

CREATE TABLE ingredient_quantities (
    recipe_id INTEGER,
    ingredient_id INTEGER,
    quantity REAL NOT NULL,
    unit_id INTEGER,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

-- Ajouter des index sur recipe_id et ingredient_id pour améliorer les performances des requêtes
CREATE INDEX idx_ingredient_quantities_recipe_id ON ingredient_quantities (recipe_id);
CREATE INDEX idx_ingredient_quantities_ingredient_id ON ingredient_quantities (ingredient_id);

-- Insertions initiales
INSERT INTO seasons (name) VALUES
('printemps'), ('été'), ('automne'), ('hiver'), ('toute l\'année');

INSERT INTO ingredient_types (name) VALUES
('légume'), ('fruit'), ('épice'), ('aromate'), ('céréale'),
('viande'), ('poisson'), ('produit laitier'), ('noix et graines'),
('condiment'), ('sucrant'), ('boisson');

INSERT INTO units (name, abbreviation) VALUES
('unité', 'unité'), ('gramme', 'g'), ('kilogramme', 'kg'),
('litre', 'L'), ('centilitre', 'cl'), ('pincée', 'pincée'),
('cuillère à soupe', 'cs'), ('cuillère à café', 'cc');

INSERT INTO ingredients (name, image, type_id, season_id, has_ingredient) VALUES
('carotte', 'carotte.jpg', 1, 1, TRUE),
('fraise', 'fraise.jpg', 2, 2, FALSE),
('cannelle', 'cannelle.jpg', 3, 5, TRUE),
('basilic', 'basilic.jpg', 4, 1, FALSE),
('riz', 'riz.jpg', 5, 5, TRUE),
('poulet', 'poulet.jpg', 6, 5, TRUE);

INSERT INTO ingredient_quantities (recipe_id, ingredient_id, quantity, unit_id) VALUES
(1, 1, 3, 1),   -- 3 unités de carottes
(1, 3, 1, 7),   -- 1 cuillère à soupe de cannelle
(2, 2, 200, 2), -- 200 grammes de fraises
(3, 6, 1, 3),   -- 1 kilogramme de poulet
(3, 5, 500, 2); -- 500 grammes de riz
