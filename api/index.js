const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/User.js");
const Order = require("./models/Order.js");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const jwtSecret = process.env.JWT_SECRET;
let cart = [];
app.listen(5000);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send({
    mssg: "welcome",
  });
});

app.get("/users", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await User.find());
});

app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // console.log(`${password} ${userDoc.password}`);
    if (password === userDoc.password) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { sameSite: "none", secure: true }).json({
            name: userDoc.name,
            email: userDoc.email,
          });
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { sameSite: "none", secure: true }).json(true);
  //   res.send("true");
});

app.get("/products", (req, res) => {
  axios.get("https://fakestoreapi.com/products").then((resp) => {
    // console.log(resp.data);
    res.send(resp.data);
  });
});

app.get("/cart", (req, res) => {
  // console.log(cart);
  res.json(cart);
});

app.post("/cart", (req, res) => {
  cart = req.body.cart;
  res.json("ok");
});

app.post("/placeOrder", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { cart, amount } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { _id } = await User.findById(userData.id);
      try {
        const orderDoc = await Order.create({
          user: _id,
          cart,
          amount,
        });
        res.json(orderDoc);
      } catch (e) {
        throw e;
      }
    });
  } else {
    res.json(null);
  }
});
