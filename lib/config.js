"use strict";
const fs = require("fs");
const Path = require("path");
function readConfig() {
    return new Promise((res, rej) => {
        fs.readFile(Path.resolve(__dirname, "../config.json"), "utf-8", (err, data) => {
            if (err) {
                rej(err);
            }
            else {
                res(JSON.parse(data));
            }
        });
    });
}
exports.readConfig = readConfig;
//# sourceMappingURL=config.js.map