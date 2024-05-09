import * as dotenv from "dotenv";
import path from 'path';
const envPath = path.resolve(__dirname, '../../.env'); 
dotenv.config({path: envPath});

export const development = {
    server_port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : undefined,
    socket_port: process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : undefined,
    database: process.env.DB_NAME ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    host: 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5736,
    dialect: 'postgres',
    define: {
        timestamps: false // Remove colunas chatas
    },
};


