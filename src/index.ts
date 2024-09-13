import express, { Request, Response } from 'express';
import session from 'express-session';
import { router } from './routes/loginRoutes';

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

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
