var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("template/master", {
    content: "../auth_view/login",
    heading: "Search page"
  });
});

router.post('/login', (req, res) => {
  res.send(req.body);
  const {username, password} = req.body;
})

module.exports = router;
