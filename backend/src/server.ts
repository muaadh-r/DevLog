import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "DevLog"
    });
});

app.listen(port, () => {
    console.log(`DevLog API running at http://localhost:${port}`);
});