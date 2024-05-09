"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sessionRoute_1 = require("./routes/sessionRoute");
const environment_1 = require("./types/environment");
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/session', sessionRoute_1.sessionRouter);
app.listen(environment_1.devEnvironment.SERVERPORT, () => { console.log("API GATEWAY is running in port ", environment_1.devEnvironment.SERVERPORT); });
