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
exports.DataController = void 0;
const environment_1 = require("../types/environment");
const axios_1 = __importDefault(require("axios"));
class DataController {
    constructor() {
        this.redirect = (url, api, req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            if (!environment_1.ROUTES.some(route => route.url == url)) {
                console.log("Is no match");
                throw new Error;
            }
            const route = environment_1.ROUTES.find(route => route.url == url);
            try {
                let config = {
                    method: req.method,
                    url: `${route.target}${api}`,
                    data: req.body,
                    headers: {
                        'Content-Type': req.headers['content-type']
                    },
                };
                console.log(config);
                let response = yield axios_1.default.request(config);
                return response;
            }
            catch (err) {
                throw new Error;
            }
        });
    }
}
exports.DataController = DataController;
