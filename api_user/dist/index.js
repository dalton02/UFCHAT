"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sigaaRouter_1 = require("./routes/sigaaRouter");
const environment_1 = require("./types/environment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: environment_1.development.SERVER_GATEWAY,
}));
app.use('/', sigaaRouter_1.router);
app.listen(environment_1.development.PORT, () => console.log('Running in port: ', environment_1.development.PORT));
