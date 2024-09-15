"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const decorators_1 = require("./decorators");
const AppRouter_1 = require("../AppRouter");
const router = AppRouter_1.AppRouter.getInstance();
exports.router = router;
router.get('/login', (req, res) => {
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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && verifyCredentials(email, password)) {
        //@ts-ignore
        req.session.isLoggedIn = true;
        //@ts-ignore
        req.session.email = email;
    }
    res.redirect('/');
});
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
        <a href="/login">Login</a>
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
        res.redirect('/login');
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
function verifyCredentials(email, password) {
    const hardCodedEmail = 'a@a.com';
    const hardCodedPassword = '1234';
    return email === hardCodedEmail && password === hardCodedPassword;
}
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
