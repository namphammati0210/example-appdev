var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const trainer = require("../database/models/trainer");
const Role = database.db.Role;
const TrainingStaff = database.db.TrainingStaff;
const Trainer = database.db.Trainer;
const Account = database.db.Account;

/* GET home page. */
router.get("/", async function (req, res, next) {
  const accounts = await Account.findAll({
    include: Role
  });

  const staffAccounts = accounts.filter(account => account.Role.name === 'trainingStaff');
  const trainerAccounts = accounts.filter(account => account.Role.name === 'trainer');

  // const staffAccounts = await Account.findAll({
  //   include: [{
  //     model: Role,
  //     attributes: ['id', 'name'],
  //     where: {
  //       name: 'trainingStaff'
  //     },
  //     required: false
  //   }],
    
  // });
  
  res.render('admin_view/index', {staffAccounts, trainerAccounts})
});

const getUserByRole = async (roleName, userId) => {
  let user;

  switch(roleName)  {
    case 'trainingStaff': {
      user = await TrainingStaff.findOne({
        where: {
          id: userId
        }
      })
      return user;
    }
    case 'trainer': {
      await Trainer.findOne({
        where: {
          id: userId
        }
      })

      return user;
    }
    default: {
      res.send('Not found any user')
    }
  }
  
}

/* GET home page. */
router.get("/viewAccount", async function (req, res, next) {
  try {
    const {id} = req.query;
    const account = await Account.findOne({
      where: {
        id
      },
      include: Role
    })

    const user = await getUserByRole(account.Role.name, account.userId);
    const accountDetail = {...account.dataValues, User: user};

    res.send(accountDetail);
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 80 ~ error", error)
    res.redirect('/admin')
  }
  
});

/* GET create staff page. */
router.get("/createStaff", async function (req, res, next) {
  const staffRole = await Role.findOne({
    where: {
      name: "trainingStaff",
    },
  });
  res.render("trainingStaff_view/create", { staffRole: staffRole });
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
/* GET create trainer page. */
router.get("/createTrainer", async function (req, res, next) {
  const trainerRole = await Role.findOne({
    where: {
      name: "trainer",
    },
  });
  res.render("trainer_view/create", { trainerRole: trainerRole });
});

router.post("/addTrainer", async function (req, res) {
  const {fullname,specialty,age,address,email,username,password,roleId} =
    req.body;

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
module.exports = router;
