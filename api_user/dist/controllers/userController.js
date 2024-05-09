"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor() {
        this.getCookiesFromSigaa = () => {
            return new Promise((resolve, reject) => {
                const myHeaders = new Headers();
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                };
                fetch("https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf", requestOptions)
                    .then((response) => {
                    const cookieValue = response.headers.get('Set-Cookie');
                    resolve(cookieValue.toString()); // ! evita do typescript ser um sacana 
                }).catch((error) => reject(error));
            });
        };
        this.getInfoFromSigaa = (login, password, cookie) => {
            return new Promise((resolve, reject) => {
                const myHeaders = new Headers();
                myHeaders.append("Host", "sig.ufca.edu.br");
                myHeaders.append("Referer", "https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf");
                myHeaders.append("Origin", "https://sig.ufca.edu.br");
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                myHeaders.append("X-Requested-With", "XMLHttpRequest");
                myHeaders.append("Cookie", cookie);
                const urlencoded = new URLSearchParams();
                urlencoded.append("form-login", "form-login");
                urlencoded.append("form-login:j_id_jsp_35904869_2", login);
                urlencoded.append("form-login:j_id_jsp_35904869_3", password);
                urlencoded.append("form-login:entrar", "Entrar"); // Corrigido para "form-login:entrar" em vez de "form-login: entrar"
                urlencoded.append("javax.faces.ViewState", "j_id1");
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: urlencoded,
                };
                let customCookie = cookie.split(';')[0];
                let partes = customCookie.split("=");
                customCookie = "jsessionid=" + partes[1];
                fetch(`https://sig.ufca.edu.br/sigaa/mobile/touch/login.jsf;${customCookie}`, requestOptions)
                    .then((response) => {
                    resolve(response.text());
                })
                    .catch((error) => reject(error));
            });
        };
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
        this.convertCharacters = (string) => {
            //Replacing the UTF-8 chars
            // ^
            string = string.replace(/&Ecirc;/g, 'Ê');
            string = string.replace(/&Acirc;/g, 'Â');
            string = string.replace(/&Ocirc;/g, 'Ô');
            string = string.replace(/&Ucirc;/g, 'Û');
            string = string.replace(/&Icirc;/g, 'Î');
            string = string.replace(/&Ccedil;/g, 'Ç');
            // ~
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
