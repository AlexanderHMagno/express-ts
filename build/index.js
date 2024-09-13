"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = require("./routes/loginRoutes");
const app = (0, express_1.default)();
const PORT = 8000;
//Middlewares
//Add json Body to request
app.use(express_1.default.json());
//Add Url
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => res.redirect('/login'));
app.use(loginRoutes_1.router);
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
