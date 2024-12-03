import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

export const datasource = new DataSource({
    type: "mysql", // Type de la base de données
    host: process.env.DB_HOST || "localhost", // Hôte de la base de données
    port: parseInt(process.env.DB_PORT || "3306"), // Port MySQL (par défaut 3306)
    username: process.env.DB_USERNAME || "root", // Nom d'utilisateur
    password: process.env.DB_PASSWORD || "", // Mot de passe de l'utilisateur
    database: process.env.DB_DATABASE || "food_roulette", // Nom de la base de données
    entities: ["./src/entities/*.ts"], // Chemin vers tes entités
    migrations: ["./src/migrations/*.ts"], // Chemin vers tes migrations Commandes pour migrer : npx typeorm migration:generate -d src/migrations -n InitDatabase PUIS : npx typeorm migration:run    
    synchronize: true, // Utiliser des migrations au lieu de synchronize en production
    dropSchema: false,
    logging: true, // Activer le logging pour voir les requêtes SQL
});
