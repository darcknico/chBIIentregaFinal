import express from "express";
import session from 'express-session'
import { config } from './config/index.js';
import { connectDb } from './config/database.config.js';
import appRouter from './routers/index.js';
import cookieParser from "cookie-parser";
import passport from 'passport';
import {initializePassport} from './config/passport.config.js';
import MongoStore from "connect-mongo";

const app = express();
const port = 8080;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
initializePassport(); 
app.use(
  session({
      secret: config.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
          mongoUrl: config.MONGO_URL,
          ttl: 100,
      }),
  })
);
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(appRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
