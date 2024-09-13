import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';

const app = express();
const PORT = 8000;

//Middlewares

//Add json Body to request
app.use(express.json());
//Add Url
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.redirect('/login'));
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
