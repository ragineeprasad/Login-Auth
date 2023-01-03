var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
  console.log("Index")
});

module.exports = router;