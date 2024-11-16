import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import connectDB from "./db/db.js";
import upload from "./multerConfig.js";
import fs from "fs";
import ImageUp from "./model/ImageUp.js";

//need to show file browser
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadFilePath = join(__dirname, "uploads");
app.use("/uploads", express.static(uploadFilePath));
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(cors())

app.post("/uploads", async (req, res, next) => {
  upload.single("images")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    }

    //file not uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File not uploaded" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(400)
        .json({ success: false, message: "Pleae fill all this field" });
    }
    const newDatas = new ImageUp({
      title,
      description,
      images: `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`,
    });
    console.log(newDatas, "newData");
    try {
      await newDatas.save();
      res.status(200).json({ success: true, data: newDatas });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });
});

app.get("/images", async (req, res, next) => {
  try {
    const images = await ImageUp.find({});
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/images/:id", async (req, res, next) => {
  const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid image id" });
  }

  try {
    const image = await ImageUp.findByIdAndDelete(id);

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    const imagePath = image.images.replace(/\\/g, "/");

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.error(`File not found at path: ${imagePath}`);
    }

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error during image deletion:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runing on port:${PORT}`);
  connectDB();
});
