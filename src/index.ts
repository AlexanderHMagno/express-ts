import express, { Request, Response } from 'express';
import session from 'express-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();
const PORT = 8000;

//Middlewares

//Add json Body to request
app.use(express.json());
//Add UrlEncoded body to Request
app.use(express.urlencoded({ extended: true }));

//Add Session to request
// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(AppRouter.getInstance());

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
