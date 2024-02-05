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
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_http_1 = require("node:http");
const node_url_1 = require("node:url");
const port = 8000;
const http = (0, node_http_1.createServer)((req, res) => {
    const parsedUrl = (0, node_url_1.parse)(req.url, true);
    const fileName = parsedUrl.query.file;
    console.log(req.url, fileName);
    getFile(req, res, fileName);
});
const getFile = (req, res, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const xhtml = yield (0, promises_1.readFile)(__dirname + "/" + file);
        const type = `application/${file.includes("xhtml") ? "xhtml+" : ""}xml`;
        res.writeHead(200, { "content-length": Buffer.byteLength(xhtml), "content-type": type });
        res.end(xhtml);
    }
    catch (error) {
        res.writeHead(404);
        res.end("No such file : " + file);
    }
});
http.listen(port, () => console.log("Port", port));
