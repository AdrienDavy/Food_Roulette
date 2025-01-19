import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Vérification des variables d'environnement
if (!process.env.IMAGEKITIO_PUBLIC_KEY || !process.env.IMAGEKITIO_PRIVATE_KEY) {
    console.error("Les clés ImageKit ne sont pas définies dans .env !");
    process.exit(1);
}

// Configuration d'ImageKit
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKITIO_PUBLIC_URL_ENDPOINT!,
    publicKey: process.env.IMAGEKITIO_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKITIO_PRIVATE_KEY!
});

// Configuration CORS
const allowedOrigins = ['http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS error: Origin ${origin} not allowed`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

// Appliquer le middleware CORS
app.use(cors(corsOptions));

// Route d'authentification pour ImageKit
app.get('/auth', (req: Request, res: Response) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error generating auth parameters:", error);
        res.status(500).json({ error: "Failed to generate auth parameters" });
    }
});

// Lancement du serveur
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Live at Port ${PORT} for ImageKit 🚀`);
});
