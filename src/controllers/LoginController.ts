import { NextFunction, Request, Response } from 'express';
import { get, post } from './decorators/router';
import { Controller } from './decorators/controller';
import { use } from './decorators/middleware';
import { bodyValidator } from './decorators/bodyValidator';

function testingMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Testing this middleware Decorator on the login get endpoint');
  next();
}

@Controller('/auth')
export class LoginController {
  @get('/login')
  @use(testingMiddleware)
  login(req: Request, res: Response): void {
    res.send(`
      <form method="post">
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
  }

  @post('/login')
  @bodyValidator('email', 'password', 'name')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (verifyCredentials(email, password)) {
      //@ts-ignore
      req.session.isLoggedIn = true;
      //@ts-ignore
      req.session.email = email;
    }

    res.redirect('/');

    function verifyCredentials(email: string, password: string): boolean {
      const hardCodedEmail = 'a@a.com';
      const hardCodedPassword = '1234';

      return email === hardCodedEmail && password === hardCodedPassword;
    }
  }
}
