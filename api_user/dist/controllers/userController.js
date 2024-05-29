"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const axios_1 = __importDefault(require("axios"));
// Classe responsável por lidar com operações relacionadas ao usuário no sistema.
class UserController {
    constructor() {
        // Obtém os cookies do SIGAA.
        this.getCookiesFromSigaa = () => {
            return new Promise((resolve, reject) => {
                // Configurações da requisição
                const requestOptions = {
                    method: "GET",
                    headers: {
                        'Cookie': '' // Definindo o cabeçalho Cookie como vazio
                    }
                };
                // Realiza a requisição para obter os cookies do SIGAA
                axios_1.default.get("https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf", requestOptions)
                    .then((response) => {
                    // Extrai o cookie do cabeçalho da resposta
                    const cookieHeader = response.headers['set-cookie'];
                    if (cookieHeader && Array.isArray(cookieHeader) && cookieHeader.length > 0) {
                        const cookieValue = cookieHeader[0];
                        resolve(cookieValue);
                    }
                    else
                        reject(new Error("Cookie not found in response headers"));
                })
                    .catch((error) => reject(error));
            });
        };
        // Obtém informações do SIGAA.
        this.getInfoFromSigaa = (login, password, cookie) => {
            return new Promise((resolve, reject) => {
                // Configurações do cabeçalho da requisição
                const myHeaders = {
                    "Host": "sig.ufca.edu.br",
                    "Referer": "https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf",
                    "Origin": "https://sig.ufca.edu.br",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": cookie
                };
                // Dados da requisição
                const data = new URLSearchParams();
                data.append("form-login", "form-login");
                data.append("form-login:j_id_jsp_35904869_2", login);
                data.append("form-login:j_id_jsp_35904869_3", password);
                data.append("form-login:entrar", "Entrar");
                data.append("javax.faces.ViewState", "j_id1");
                // Realiza a requisição para obter as informações do SIGAA
                axios_1.default.post("https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf", data, { headers: myHeaders })
                    .then((response) => {
                    resolve(response.data);
                })
                    .catch((error) => reject(error));
            });
        };
        // Obtém o HTML essencial da página.
        this.getEssentialHtml = (page) => {
            return new Promise((resolve, reject) => {
                let strings = {};
                let pattern = /<strong>(.*?)<\/strong>/g;
                let search = page.match(pattern);
                let fullname = search[0].replace(/<\/?strong>/g, '');
                fullname = this.convertCharacters(fullname);
                pattern = /<span id="form-portal-discente:matricula">(.*?)<\/span>/g;
                search = page.match(pattern);
                let id = search[0].replace(/<\/?span>/g, '');
                id = id.replace(/<span id="form-portal-discente:matricula">/g, '');
                pattern = /<\/strong><br\/>\s*(.*?)<br\/>/g;
                search = page.match(pattern);
                let course = search[0].replace(/<\/?strong>/g, '');
                course = course.replace(/<br\/>/g, '');
                course = course.trim();
                course = this.convertCharacters(course);
                strings = {
                    fullname: fullname,
                    id: id,
                    course: course
                };
                resolve(strings);
            });
        };
        // Converte caracteres especiais em sua forma legível.
        this.convertCharacters = (string) => {
            string = string.replace(/&Ecirc;/g, 'Ê');
            string = string.replace(/&Acirc;/g, 'Â');
            string = string.replace(/&Ocirc;/g, 'Ô');
            string = string.replace(/&Ucirc;/g, 'Û');
            string = string.replace(/&Icirc;/g, 'Î');
            string = string.replace(/&Ccedil;/g, 'Ç');
            string = string.replace(/&Atilde;/g, 'Ã');
            string = string.replace(/&Otilde;/g, 'Õ');
            string = string.replace(/&Etilde;/g, 'Ẽ');
            string = string.replace(/&Utilde;/g, 'Ũ');
            string = string.replace(/&Itilde;/g, 'Ĩ');
            return string;
        };
    }
}
exports.UserController = UserController;
