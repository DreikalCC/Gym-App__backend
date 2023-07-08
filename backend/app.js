const { config } = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors, celebrate, Joi } = require("celebrate");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const usersRoute = require("./routes/usersRoutes");
const exercisesRoute = require("./routes/exercisesRoutes");
const { login, createUser } = require("./controllers/usersController");

config();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "data")));

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.use("/users", auth, usersRoute);
app.use("/exercises", auth, exercisesRoute);

app.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(6),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      lastname: Joi.string().min(2).max(30),
      role: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().min(6),
    }),
  }),
  createUser
);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});
