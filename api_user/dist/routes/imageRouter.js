"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
const imageRouter = express_1.default.Router();
exports.imageRouter = imageRouter;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
imageRouter.post('/', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(404).json({ message: 'No file uploaded' });
        }
        const image = req.file.buffer;
        const cookies = JSON.parse(req.body.cookies);
        yield (0, sharp_1.default)(image).webp().toFile(`resource/images/${cookies.login}.webp`);
        console.log("Imagem inserida com sucesso");
        return res.status(200).json({ message: 'Imagem inserida com sucesso' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Erro ao inserir imagem' });
    }
}));
