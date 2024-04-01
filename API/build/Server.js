"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Http_1 = require("./Http");
var port = parseInt(process.env.PORT || '4567', 10);
var app = (0, Http_1.createServer)();
app.listen(port, function () {
    console.log("Servidor WebSocket iniciado na porta ".concat(port));
});
