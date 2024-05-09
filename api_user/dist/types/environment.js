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
exports.development = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
exports.development = {
    database: (_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : '',
    username: (_b = process.env.DB_USERNAME) !== null && _b !== void 0 ? _b : '',
    password: (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : '',
    host: (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false // Remove colunas chatas
    },
};
