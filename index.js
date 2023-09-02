import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import {verifyToken} from "./middleware/auth.js";
import {createClient} from 'redis';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
/* morgan to log */
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

/* CORS */
app.use(cors())
app.options('*', cors())

/*config can redirect to image in public asset */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    }, filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({storage})


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/**
 * loi chao toi tu toi nha
 * */
app.get('/', (req, res) => {
    res.send('Hello xin chao Tris dep zai day')
})

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`App bootstrap in port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));