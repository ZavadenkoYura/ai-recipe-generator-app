import { config } from "dotenv";

config();

import express, { Application, Request, Response } from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";

import { exportFinalRecipe } from "./utils/recipeGenerationService";
import { connect } from "./db/mongoDB";
import { recipeModel } from "./models/recipeModel";
import { ILLMRecipeOutput } from "./types/IRecipe";
import { unlinkSync } from "fs";

const app: Application = express();
const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req: Request, file, callback) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
      callback(null, true);
    }
    callback(null, false);
  },
});

app.use(express.static("uploads"));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(helmet());

app.post(
  "/v1/recipe/generate",
  upload.single("dish-image"),
  async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    const file = req.file;

    console.log(file);

    try {
      if (!file) {
        res.status(400).json("[No file uploaded]");
        return;
      }

      // Generate a recipe
      const recipe: ILLMRecipeOutput = await exportFinalRecipe(file!);

      // Store the recipe in Mongodb database
      const recipeDoc = await recipeModel.create({
        ...recipe,
        url: `http://${process.env.DOMAIN_NAME}:${PORT}/${file!.filename}`,
      });

      res.status(201).json(recipeDoc);
    } catch (error) {
      unlinkSync(path.join("uploads", file!.filename));
      res.status(500).json(error);
    }
  }
);

app.get("/v1/recipe/retreive", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const pageNumber = Number(req.query.page) || 1;
  const pageLimit = Number(req.query.limit) || 10;
  const offset = (pageNumber - 1) * pageLimit;

  const recipeDocs = await recipeModel
    .find()
    .skip(offset)
    .limit(pageLimit)
    .sort({ _id: -1 });
  const totalRecords = await recipeModel.countDocuments();

  if (!recipeDocs.length) {
    res.status(404).json("[No recipes found]");
    return;
  }

  res.status(200).json({
    recipies: recipeDocs,
    pagination: {
      page: pageNumber,
      pageLimit: pageLimit,
      totalPages: Math.ceil(totalRecords / pageLimit),
    },
  });
});

app.get("/v1/recipe/retreive/:id", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");

  const id = req.params.id;

  if (!id) {
    res.status(400).json("[No such records found]");
    return;
  }

  const recipeDoc = await recipeModel.findById(id);

  if (!recipeDoc) {
    res.status(404).json("[No recipes found]");
    return;
  }

  res.status(200).json(recipeDoc);
});

// MongoDB connection initiation
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server is listening on port ${PORT}]`);
  });
});
