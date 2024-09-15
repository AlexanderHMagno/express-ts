import { Request, Response, NextFunction } from 'express';
import { Bottle } from './decorators';
import { AppRouter } from '../AppRouter';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = AppRouter.getInstance();

router.get('/', (req: Request, res: Response) => {
  console.log(req.session);
  //@ts-ignore
  if (req.session.isLoggedIn) {
    const loggedInHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Profile</title>
      </head>
      <body>
          
          <h2>Welcome, ${
            //@ts-ignore
            req.session.email
          }</h2>
          <a href="/logout">Logout</a>
      </body>
      </html>
    `;
    res.send(loggedInHtml);
  } else {
    const notAuthenticatedHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Not Authenticated</title>
    </head>
    <body>
        <h2>You are not authenticated</h2>
        <a href="/auth/login">Login</a>
    </body>
    </html>
  `;
    res.status(401).send(notAuthenticatedHtml);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  //destroy session redirect to login
  req.session.destroy(() => {
    console.log('session is over');
    res.redirect('/auth/login');
  });
});

router.get('/protected', authRequired, (req: Request, res: Response) => {
  res.send('Hey welcome to this protected route');
});

router.get('/bottle', (req: Request, res: Response) => {
  const bottle = new Bottle('Khoury');
  bottle.showMe();
  res.send(bottle.greet('Ahoy', 2));
});

//Middleware:

function authRequired(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  if (req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Action not authorized');
}

export { router };
