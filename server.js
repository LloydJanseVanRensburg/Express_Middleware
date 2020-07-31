const express = require("express");
const cors = require("cors");

const app = express();

//============ Built-in Middleware
//Both of these middleware helps to parse the income requests before it is used in the routes sets a re.body key value pair object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//============ Third Party Middleware
// This middleware sets headers to handle income requests and response to the client side application
app.use(cors());

//============ App Level Middleware
app.use((req, res, next) => {
  console.log("This is a App Level Middleware");
  next(); // VERY IMPORTANT TO CALL NEXT() IF YOU WANT TO CONTINUE TO NEXT MIDDLEWARE OF ROUTE CONTROLLER
});

//============ Router Level Middleware
const routerLevelMiddleware = (req, res, next) => {
  console.log("This is a Router level Middleware");
  // Middleware has access to the request and response objects and can change them for example
  req.randomKey =
    'Just added a random key value pair on the request object in this middleware before the req gets to the get route ("/")';
  next(); // CALL NEXT()!!!!
};

app.get("/", routerLevelMiddleware, (req, res) => {
  console.log("This is a Router Controller Fuction");
  // Because of middleware i have access to this req.randomKey and req.body object key value pair that was set in the middleware
  console.log(req.randomKey);
  console.log(req.body);
});

//============ Error Handling Middleware
app.use((err, req, res, next) => {
  console.log("Error Was Forwarded to me from somewhere in the Application");
  res.send(`Something went wrong in application ${err}`);
});

app.listen(5000);
