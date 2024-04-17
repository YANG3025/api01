import express from "express";
import multer from "multer";
import moment from "moment";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

let whitelist = ["http://localhost:5500", "http://localhost:3000"];
let corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許傳遞資料 CORS"));
    }
  },
};
const upload = multer();

const defaultData = { product: [], user: [] };

const db = new Low(new JSONFile("db.json"), defaultData);
await db.read();
// console.log(db.data);

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("首頁");
});
app.get("/api/products", (req, res) => {
   res.send("獲取所有產品");
});
app.get("/api/products/search",(req,res) => {
    res.send("使用 ID 作為搜尋條件來搜尋產品")
});

app.get("/api/products/:id/", (req, res) => {
  res.send(`獲取特定 ID 的產品${req.params.id}`);
});
app.post("/api/products", (req, res) => {
  res.send("新增一個產品");
});
app.put("/api/products/:id/", (req, res) => {
  res.send(`更新特定 ID 的產品${req.params.id}`);
});
app.delete("/api/products/:id/", (req, res) => {
  res.send(`刪除特定 ID 的產品${req.params.id}`);
});




app.listen(3000, () => {
  console.log("server is running at http://localhost:3000 ");
});


