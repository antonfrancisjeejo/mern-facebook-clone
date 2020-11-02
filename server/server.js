import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
import mongoPost from "./mongoPost.js";

Grid.mongo = mongoose.mongo;

const app = express();
const port = 5000 || process.env.PORT;

const pusher = new Pusher({
  appId: "1091209",
  key: "878b37735eddd229253c",
  secret: "4baedee1a79b4d879a63",
  cluster: "ap2",
  useTLS: true,
});

app.use(bodyParser.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://jeejo13:jeejo123@cluster0.nfykp.mongodb.net/fb-backend?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");

  const changeStream = mongoose.connection.collection("posts").watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      console.log("Triggering Pusher");

      pusher.trigger("posts", "inserted", {
        change: change,
      });
    } else {
      console.log("Error triggering");
    }
  });
});

let gfs;

conn.once("open", () => {
  console.log("DB Connected");

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      {
        const filename = `image-${Date.now()}${path.extname(
          file.originalname
        )}`;

        const fileInfo = {
          filename: filename,
          bucketName: "images",
        };
        resolve(fileInfo);
      }
    });
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});

app.post("/upload/post", (req, res) => {
  const dbPost = req.body;

  mongoPost.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/image/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "File not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

app.get("/retrieve/posts", (req, res) => {
  mongoPost.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
