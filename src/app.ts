import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
import("../src/todo/todoController");

app.set("views",path.join(__dirname,"views")); // Set the views directory
app.set("view engine", "ejs"); // Set the view engine to 'ejs'
app.get("/", (req: Request, res: Response) => {
    res.render("home.ejs");
});

export default app;
