"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = exports.devEnvironment = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
exports.devEnvironment = {
    ACCESS_TOKEN_SECRET: (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '',
    REFRESH_TOKEN_SECRET: (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : '',
    TOKEN_ACCESS_EXPIRES: '10h',
    TOKEN_REFRESH_EXPIRES: '10h',
    SERVER_PORT: (_c = process.env.SERVER_PORT) !== null && _c !== void 0 ? _c : 0,
    SERVER_USER: process.env.SERVER_USER,
    SERVER_CHAT: process.env.SERVER_CHAT,
    SERVER_NEWS: process.env.SERVER_NEWS,
    SERVER_CLIENT: (_d = process.env.SERVER_CLIENT) !== null && _d !== void 0 ? _d : ''
};
exports.ROUTES = [
    {
        url: 'session',
        target: process.env.SERVER_USER,
    },
    {
        url: 'chat',
        target: process.env.SERVER_CHAT,
    },
    {
        url: 'news',
        target: process.env.SERVER_NEWS,
    }
];
