// Imports.
import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import expressSessions from "express-session";
import { authRouter, notesRouter } from "./routes";
import Express, { json, urlencoded, Request, Response } from "express";
import config from "./config";

// Constants.
const app = Express();
const oneDay = 1000 * 60 * 60 * 24;

// Global middleware.
app.use(json());
app.set('view engine', 'njk');
app.use(urlencoded({ extended: true }));
app.use("/static", express.static('public'))
app.use(cookieParser());
app.use(expressSessions({
    secret: config.SESSION_SECRET,
    cookie: { maxAge: oneDay },
    resave: true,
    saveUninitialized: false,
}));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Routes.
app.get("/", (req: Request, res: Response) => { res.redirect("/auth/sign-in") })
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

// Server.
app.listen(config.PORT, () => {
    console.log(`Server active on http://localhost:${config.PORT}/`);
});