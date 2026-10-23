import express from "express";
import { randomUUID } from "node:crypto";
import { report } from "node:process";

const app = express();
const port = 3000;

app.use(express.json());

type Report = {
    id: string;
    description: string;
    gameVersion: string;
    category: string;
    status: "Open" | "Investigating" | "Fixed";
    createdAt: string;
};

const reports: Report[] = [];

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "DevLog"
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DevLog API"
    });
});

app.get("/reports", (req, res) => {
    res.json(reports);
});

app.post("/reports", (req, res) => {
    const { description, gameVersion, category } = req.body ?? {};

    // Validate the three fields.
    if (
        typeof description !== "string" ||
        typeof gameVersion !== "string" ||
        typeof category !== "string" ||
        description.trim().length === 0 ||
        gameVersion.trim().length === 0 ||
        category.trim().length === 0
    ) {
        res.status(400).json({
            error: "description, gameVersion, and category are required"
        });
        return;
    }

    // Create a Report object.
    const r: Report = {
        id: randomUUID(),
        description: description.trim(),
        gameVersion: gameVersion.trim(),
        status: "Open",
        category: category.trim(),
        createdAt: new Date().toISOString()
    };

    // Add it to the reports array.
    reports.push(r);

    // Return the new report.
    res.status(201).json(r);
});

app.listen(port, () => {
    console.log(`DevLog API running at http://localhost:${port}`);
});