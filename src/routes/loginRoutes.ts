import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
        <form action="/login" method="post">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && verifyCredentials(email, password)) {
    //@ts-ignore
    req.session.isLoggedIn = true;
    const loggedInHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Profile</title>
      </head>
      <body>
          <h2>Welcome, ${email}</h2>
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
        <a href="/login">Login</a>
    </body>
    </html>
  `;
    res.status(401).send(notAuthenticatedHtml);
  }
});

function verifyCredentials(email: string, password: string): boolean {
  const hardCodedEmail = 'a@a.com';
  const hardCodedPassword = '1234';

  return email === hardCodedEmail && password === hardCodedPassword;
}

export { router };
