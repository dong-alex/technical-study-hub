const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("./middlewares");
const passport = require("./passport");
const authRoutes = require("./api/authRoutes");
const questionRoutes = require("./api/questionRoutes");
const tagRoutes = require("./api/tagRoutes");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/auth/v1", authRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;
