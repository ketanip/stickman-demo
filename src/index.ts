// Imports.
import config from "./config";
import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import expressSessions from "express-session";
import { authRouter, dashboardRouter } from "./routes";
import Express, { json, urlencoded, Request, Response } from "express";

// Constants.
const app = Express();

// Global middleware.
app.use(json());
app.use(cookieParser());
app.set('view engine', 'njk');
app.use(urlencoded({ extended: true }));
app.use("/static", express.static('public'))
app.use(expressSessions({
    secret: config.SESSION_SECRET,
    cookie: { maxAge: config.cookieExpiry },
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
app.use("/dashboard", dashboardRouter);

// Server.
app.listen(config.PORT, () => {
    console.log(`Server active on http://localhost:${config.PORT}/`);
});