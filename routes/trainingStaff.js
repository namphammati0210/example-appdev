var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const trainee = require("../database/models/trainee");
const Role = database.db.Role;
const Trainee = database.db.Trainee;
const Account = database.db.Account;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello training staff");
});

/* GET create trainee page. */
router.get("/createTrainee", async function (req, res, next) {
  const traineeRole = await Role.findOne({
    where: {
      name: "trainee",
    },
  });

  res.render('template/master', {
    content: '../trainee_view/create',
    heading: 'Create trainee account',
    traineeRole
  })
});

router.post("/addTrainee", async function (req, res) {
  const { username, password, fullname, age, dateOfBirth, education, email, roleId } =
    req.body;

  const trainee = await Trainee.create({
    fullname,
    age,
    dateOfBirth,
    education,
    email,
  });

  if (trainee) {
    await Account.create({
      username,
      password,
      roleId,
      userId: trainee.dataValues.id,
    });

    res.redirect("/trainingStaff");
  }
});

module.exports = router;

