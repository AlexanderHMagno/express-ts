import { Request, Response, NextFunction } from 'express';
import { get } from './decorators/router';
import { Controller } from './decorators/controller';
import { use } from './decorators/middleware';

@Controller('')
export class RouteController {
  @get('/protected')
  @use(authRequired)
  protected(req: Request, res: Response) {
    res.send(`
          <div style="text-align: center; margin-top: 50px;">
        <h1 style="font-family: Arial, sans-serif; color: #333;">Welcome to My Website</h1>
        <p style="font-family: Arial, sans-serif; color: #666; font-size: 18px;">
            This is a sample protected route. with a link to return to the home page.
        </p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
            Go back
        </a>
    </div>
      `);
  }
  @get('/*')
  root(req: Request, res: Response) {
    console.log(req.session);
    //@ts-ignore
    if (req.session.isLoggedIn) {
      const loggedInHtml = `
        <body>
            <div style="max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
                <h2 style="font-family: Arial, sans-serif; color: #333;">Welcome, ${
                  //@ts-ignore
                  req.session.email
                }</h2>
                <div style="margin-top: 20px;">
                    <a href="/auth/logout" style="display: inline-block; margin: 10px; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #dc3545; text-decoration: none; border-radius: 5px;">
                        Logout
                    </a>
                    <a href="/protected" style="display: inline-block; margin: 10px; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                        Protected
                    </a>
                </div>
            </div>
        </body>
      `;
      res.send(loggedInHtml);
    } else {
      const notAuthenticatedHtml = `
      <body>
          <div style="max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
              <h2 style="font-family: Arial, sans-serif; color: #dc3545;">You are not authenticated</h2>
              <p style="font-family: Arial, sans-serif; color: #666; font-size: 18px;">
                  Please log in to access this page.
              </p>
              <div style="margin-top: 20px;">
                  <a href="/auth/login" style="display: inline-block; margin: 10px; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                      Login
                  </a>
              </div>
          </div>
      </body>    `;
      res.status(401).send(notAuthenticatedHtml);
    }
  }
}

function authRequired(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  if (req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send(`
    <body>
    <div style="max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h2 style="font-family: Arial, sans-serif; color: #dc3545;">Action not authorized</h2>
        <p style="font-family: Arial, sans-serif; color: #666; font-size: 18px;">
            You do not have the necessary permissions to perform this action.
        </p>
        <div style="margin-top: 20px;">
            <a href="/auth/login" style="display: inline-block; margin: 10px; padding: 10px 20px; font-family: Arial, sans-serif; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                Login
            </a>
        </div>
    </div>
</body>
`);
}
