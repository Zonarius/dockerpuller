"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Compose = require("docker-compose-js");
const Express = require("express");
const Config = require("./config");
const app = Express();
app.post('/postreceive', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let dockerPost = JSON.parse(req.body);
    res.send("OK");
    let config = yield Config.readConfig();
    let dockerComposeFile = config.hooks[dockerPost.repository.repo_url];
    let compose = Compose(dockerComposeFile);
    yield compose.pull();
    compose.up();
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = yield Config.readConfig();
        let port = config.port || 8080;
        app.listen(port, () => {
            console.log(`Listening on ${port}`);
        });
    });
}
main().catch(console.error);
