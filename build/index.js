"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const loginRoutes_1 = require("./routes/loginRoutes");
require("./controllers/LoginController");
const app = (0, express_1.default)();
const PORT = 8000;
//Middlewares
//Add json Body to request
app.use(express_1.default.json());
//Add UrlEncoded body to Request
app.use(express_1.default.urlencoded({ extended: true }));
//Add Session to request
// Configure session middleware
app.use((0, express_session_1.default)({
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
app.use(loginRoutes_1.router);
// app.use(AppRouter.getInstance());
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
