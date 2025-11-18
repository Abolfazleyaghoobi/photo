import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { Telegraf } from "telegraf";
import fs from "fs";
import cors from "cors";
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );

// توکن ربات تلگرام
const bot = new Telegraf("8247892224:AAE1OEl7fADgsvEiMAz_7ge4uwCkrPMUBAQ");

// چت آی‌دی ادمین یا گروهی که عکس ارسال بشه
const CHAT_ID = "7883847730";

app.post("/send-photo", async (req, res) => {
    try {
        const { image } = req.body; // عکس base64
        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        fs.writeFileSync("photo.png", base64Data, "base64");

        await bot.telegram.sendPhoto(CHAT_ID, { source: "photo.png" });

        return res.json({ message: "عکس با موفقیت ارسال شد به تلگرام 🤖📸" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ارسال عکس با خطا مواجه شد" });
    }
});

app.get("/", (req, res) => res.sendFile(process.cwd() + "/index.html"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
