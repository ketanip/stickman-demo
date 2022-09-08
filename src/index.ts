import Express, { json, urlencoded } from "express";
import { authRouter, notesRouter } from "./routes";

const app = Express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/notes", notesRouter);

app.listen(3001, () => {
    console.log(`Server active on http://localhost:3001/`);
});