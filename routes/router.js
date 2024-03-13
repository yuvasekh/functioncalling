// const express = require("express");
// var router = express.Router();

// router.use((req, res, next) => {
//     return next();
//   });
//   require("./azurefunctionsapi.routers")(router)
// module.exports=router
// main file

const express = require("express");
const router = express.Router();
const cors=require('cors')

// Middleware
router.use(cors())
router.use((req, res, next) => {
  // This middleware doesn't do anything, but if you want to add something here, you can.
  return next();
});

// Include azurefunctionsapi.routers
// const azureFunctionsRoutes = require("./azurefunctionsapi.routers");

// Define Azure Function routes
require("./azurefunctionsapi.routers")(router);

module.exports = router;
