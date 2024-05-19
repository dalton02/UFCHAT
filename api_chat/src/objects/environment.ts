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
    host: process.env.DB_HOST ?? 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false // Remove colunas chatas
    },
    SERVER_GATEWAY: process.env.SERVER_GATEWAY ?? '',  
    SERVER_CLIENT:  process.env.SERVER_CLIENT ?? ''
};


