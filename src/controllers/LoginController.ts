import { Request, Response } from 'express';
import { get } from './decorators/router';
import { Controller } from './decorators/controller';

@Controller('/auth')
export class LoginController {
  @get('/login')
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
