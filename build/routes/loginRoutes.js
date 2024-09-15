"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const decorators_1 = require("./decorators");
const AppRouter_1 = require("../AppRouter");
const router = AppRouter_1.AppRouter.getInstance();
exports.router = router;
router.get('/', (req, res) => {
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
        req.session.email}</h2>
          <a href="/logout">Logout</a>
      </body>
      </html>
    `;
        res.send(loggedInHtml);
    }
    else {
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
router.get('/logout', (req, res) => {
    //destroy session redirect to login
    req.session.destroy(() => {
        console.log('session is over');
        res.redirect('/auth/login');
    });
});
router.get('/protected', authRequired, (req, res) => {
    res.send('Hey welcome to this protected route');
});
router.get('/bottle', (req, res) => {
    const bottle = new decorators_1.Bottle('Khoury');
    bottle.showMe();
    res.send(bottle.greet('Ahoy', 2));
});
//Middleware:
function authRequired(req, res, next) {
    //@ts-ignore
    if (req.session.isLoggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Action not authorized');
}
