var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const AccountController = require("../controllers/account_controller");
const Role = database.db.Role;
const TrainingStaff = database.db.TrainingStaff;
const Trainer = database.db.Trainer;
const Account = database.db.Account;
const Admin = database.db.Admin;

/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log(req.session.user);
  const accounts = await Account.findAll({
    include: Role,
  });

  const staffAccounts = accounts.filter(
    (account) => account.Role.name === "trainingStaff"
  );
  const trainerAccounts = accounts.filter(
    (account) => account.Role.name === "trainer"
  );

  res.render("template/master", {
    content: "../admin_view/index",
    heading: "Admin Dashboard",
    staffAccounts,
    trainerAccounts,
  });
});

/* GET account page. */
router.get("/viewAccount", AccountController.getAccount, (req, res) => {
  res.render("template/master", {
    content: "../account_view/profile",
    heading: "Profile",
    account: req.account
  });
});

/* GET delete account. */
router.get("/deleteAccount", AccountController.deleteAccount, (req, res) => {
  res.redirect("/admin");
});

/* GET create staff page. */
router.get("/createStaff", async function (req, res, next) {
  const staffRole = await Role.findOne({
    where: {
      name: "trainingStaff",
    },
  });

  res.render("template/master", {
    content: "../trainingStaff_view/create",
    heading: "Create Training Staff account",
    staffRole,
  });
});

router.post("/addStaff", async function (req, res) {
  const { username, password, fullname, age, email, address, roleId } =
    req.body;

  const staff = await TrainingStaff.create({
    fullname,
    age,
    email,
    address,
  });

  if (staff) {
    await Account.create({
      username,
      password,
      roleId,
      userId: staff.dataValues.id,
    });

    res.redirect("/admin");
  }
});

router.get("/updatePassword/:id", async (req, res) => {
  const { id } = req.params;

  const account = await Account.findOne({
    where: {
      id
    }
  })
  
  res.render("template/master", {
    content: "../account_view/updatePassword",
    heading: "Change password",
    account,
  });
})

router.post("/changePassword", async (req, res) => {
  const { id, password } = req.body;

  const updatedAccount = await Account.update(
    {password},
    {
      where: {
        id
      }
    }
  )

  res.redirect('/admin')
})

/* GET create trainer page. */
router.get("/createTrainer", async function (req, res, next) {
  const trainerRole = await Role.findOne({
    where: {
      name: "trainer",
    },
  });

  res.render("template/master", {
    content: "../trainer_view/create",
    heading: "Create trainer account",
    trainerRole,
  });
});

router.post("/addTrainer", async function (req, res) {
  const {
    fullname,
    specialty,
    age,
    address,
    email,
    username,
    password,
    roleId,
  } = req.body;

  const trainer = await Trainer.create({
    fullname,
    specialty,
    age,
    address,
    email,
  });

  if (trainer) {
    await Account.create({
      username,
      password,
      roleId,
      userId: trainer.dataValues.id,
    });

    res.redirect("/admin");
  }
});

router.get("/createAdmin", async function (req, res, next) {
  const adminRole = await Role.findOne({
    where: {
      name: "admin",
    },
  });
  console.log("🚀 ~ file: admin.js ~ line 167 ~ adminRole", adminRole)

  res.render("template/master", {
    content: "../admin_view/create",
    heading: "Create admin account",
    adminRole,
  });
});

router.post("/addAdmin", async function (req, res) {
  const {
    fullname,
    username,
    password,
    roleId,
  } = req.body;

  const admin = await Admin.create({
    fullname,
  });

  if (admin) {
    await Account.create({
      username,
      password,
      roleId,
      userId: admin.dataValues.id,
    });

    res.redirect("/admin");
  }
});

module.exports = router;
