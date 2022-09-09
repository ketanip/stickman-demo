"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports.
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = require("./routes");
const express_2 = __importStar(require("express"));
const config_1 = __importDefault(require("./config"));
// Constants.
const app = (0, express_2.default)();
const oneDay = 1000 * 60 * 60 * 24;
// Global middleware.
app.use((0, express_2.json)());
app.set('view engine', 'njk');
app.use((0, express_2.urlencoded)({ extended: true }));
app.use("/static", express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: config_1.default.SESSION_SECRET,
    cookie: { maxAge: oneDay },
    resave: true,
    saveUninitialized: false,
}));
nunjucks_1.default.configure('views', {
    autoescape: true,
    express: app
});
// Routes.
app.get("/", (req, res) => { res.redirect("/auth/sign-in"); });
app.use("/auth", routes_1.authRouter);
app.use("/notes", routes_1.notesRouter);
// Server.
app.listen(config_1.default.PORT, () => {
    console.log(`Server active on http://localhost:${config_1.default.PORT}/`);
});
