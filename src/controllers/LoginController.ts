import { NextFunction, Request, Response } from 'express';
import { get } from './decorators/router';
import { Controller } from './decorators/controller';
import { use } from './decorators/middleware';

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
  }
}
