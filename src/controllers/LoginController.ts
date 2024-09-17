import { NextFunction, Request, Response } from 'express';
import { get, post } from './decorators/router';
import { Controller } from './decorators/controller';
import { use } from './decorators/middleware';
import { bodyValidator } from './decorators/bodyValidator';

function testingMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Testing this middleware Decorator on the login get endpoint');
  next();
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session.isLoggedIn) {
    console.log('redirecting to principal');
    res.redirect('/');
    return;
  }
  next();
}

@Controller('/auth')
export class LoginController {
  @get('/login')
  // @use(testingMiddleware)
  @use(isLoggedIn)
  login(req: Request, res: Response): void {
    res.send(`
         <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="font-family: Arial, sans-serif; color: #333; text-align: center;">Login</h1>
        <form method="post">
            <div style="margin-bottom: 15px;">
                <label for="email" style="font-family: Arial, sans-serif; color: #666; font-size: 16px;">Email:</label>
                <input type="email" id="email" name="email" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label for="password" style="font-family: Arial, sans-serif; color: #666; font-size: 16px;">Password:</label>
                <input type="password" id="password" name="password" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div style="text-align: center;">
                <button type="submit" style="padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">
                    Login
                </button>
            </div>
        </form>
        <div style="text-align: center; margin-top: 20px;">
            <a href="/" style="font-family: Arial, sans-serif; font-size: 14px; color: #007BFF; text-decoration: none;">Go back</a>
        </div>
    </div>
`);
  }

  @post('/login')
  @bodyValidator('email', 'password')
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

  @get('/logout')
  logOut(req: Request, res: Response) {
    //destroy session redirect to login
    req.session.destroy(() => {
      console.log('session is over');
      res.redirect('/auth/login');
    });
  }
}
