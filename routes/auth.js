var express = require('express');
var router = express.Router();
const database = require("../database/models/index");
const Account = database.db.Account;
const Role = database.db.Role;

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render("auth_view/login")
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await Account.findOne({
    include: Role,
    where: {
      username,
      password
    }
  })

  if(!user) {
    console.log('Incorrect username or password');
    res.redirect('/auth');
  }

  req.session.user = user;

  switch(user.Role.name) {
    case 'admin': 
      res.redirect('/admin'); 
      break;
    case 'trainingStaff':
      res.redirect('/trainingStaff');
      break;
    case 'trainer':
      res.redirect('/trainer');
      break;
    case 'trainee':
      res.redirect('/trainee');
      break;
    default:
      res.redirect('/auth');
      break;

  }

})

router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('/auth');
  })
  // res.redirect('/auth');
  
})

module.exports = router;
