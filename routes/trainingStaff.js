var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const { Op } = require("sequelize");
const Role = database.db.Role;
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const AccountController = require("../controllers/account_controller");
const CourseController = require("../controllers/course_controller");
const CourseCategoryController = require("../controllers/courseCategory_controller");
const CourseCategory = database.db.CourseCategory;
const Course = database.db.Course;
const Trainer = database.db.Trainer;
const TrainerCourse = database.db.TrainerCourse;

/* GET home page. */
router.get("/", async function (req, res) {
  const traineeAccounts = await Account.findAll({
    include: {
      model: Role,
      where: {
        name: "trainee",
      },
    },
  });
  const courseCategories = await CourseCategory.findAll();
  const courses = await Course.findAll({
    include: CourseCategory,
  });
  const trainerCourses = await TrainerCourse.findAll({
    include: [Trainer, Course],
  });

  res.render("template/master", {
    content: "../trainingStaff_view/index",
    heading: "Training Staff Dashboard",
    traineeAccounts,
    courseCategories,
    courses,
    trainerCourses,
  });
});

// ================= Trainee =================== //
/* GET create trainee page. */
router.get("/createTrainee", async function (req, res) {
  const traineeRole = await Role.findOne({
    where: {
      name: "trainee",
    },
  });

  res.render("template/master", {
    content: "../trainee_view/create",
    heading: "Create trainee account",
    traineeRole,
  });
});

router.post("/addTrainee", async function (req, res) {
  const {
    username,
    password,
    fullname,
    age,
    dateOfBirth,
    education,
    email,
    roleId,
  } = req.body;

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

router.get("/updateTrainee/:id", async (req, res) => {
  const { id } = req.params;
  const traineeAccount = await Account.findOne({
    where: {
      id,
    },
    include: Role,
  });

  const { id: accountId, username, password } = traineeAccount;

  const traineeInfo = await Trainee.findOne({
    where: {
      id: traineeAccount.userId,
    },
  });

  const traineeData = {
    ...traineeInfo.dataValues,
    username,
    password,
    accountId,
  }; // destructuring ES6
  // res.send(traineeData);
  res.render("template/master", {
    content: "../trainee_view/update",
    heading: "Update trainee profile",
    traineeData,
  });
});
router.get("/deleteAccount", AccountController.deleteAccount, (req, res) => {
  res.redirect("/trainingStaff");
});
router.post("/editTrainee", async (req, res) => {
  // res.send(req.body)
  const {
    accountId,
    username,
    password,
    traineeId,
    fullname,
    education,
    dateOfBirth,
    age,
    email,
  } = req.body;
  const updatedAccount = await Account.update(
    { username, password },
    {
      where: {
        id: accountId,
      },
    }
  );

  const updatedTrainee = await Trainee.update(
    { fullname, education, dateOfBirth, age, email },
    {
      where: {
        id: traineeId,
      },
    }
  );
  res.redirect("/trainingStaff");
});
// ================= End Trainee =================== //

/* GET create course category page. */
router.get("/createCourseCategory", async function (req, res) {
  res.render("template/master", {
    content: "../courseCategory_view/create",
    heading: "Create Course Category",
  });
});

router.post("/addCourseCategory", async function (req, res) {
  const { name, description } = req.body;
  const courseCategory = await CourseCategory.create({
    name,
    description,
  });

  res.redirect("/trainingStaff");
});

router.get(
  "/deleteCourseCategory",
  CourseCategoryController.deleteCourseCategory,
  (req, res) => {
    res.redirect("/trainingStaff");
  }
);
/* GET create course page. */
router.get("/createCourse", async function (req, res) {
  const courseCategories = await CourseCategory.findAll();
  res.render("template/master", {
    content: "../course_view/create",
    heading: "Create Course",
    courseCategories,
  });
});

router.post("/addCourse", async function (req, res) {
  const { name, description, courseCategoryId } = req.body;
  const course = await Course.create({
    name,
    description,
    courseCategoryId,
  });

  res.redirect("/trainingStaff");
});

router.get("/deleteCourse", CourseController.deleteCourse, (req, res) => {
  res.redirect("/trainingStaff");
});

// ================= Assign Trainer =================== //
router.get("/assignTrainer", async (req, res) => {
  const trainers = await Trainer.findAll();
  const courses = await Course.findAll();

  res.render("template/master", {
    content: "../trainer_view/assign",
    heading: "Assign trainer",
    trainers,
    courses,
  });
});

router.post("/assignTrainer", async (req, res) => {
  try {
    const { trainerId, courseId } = req.body;
    // res.send(`${trainerId}, ${courseId}`);
    const result = await TrainerCourse.create({
      trainerId,
      courseId,
    });

    res.redirect("/trainingStaff");
  } catch (error) {
    console.log(
      "🚀 ~ file: trainingStaff.js ~ line 133 ~ router.post ~ error",
      error
    );
  }
});

router.get("/removeTrainerTask/:trainerId/:courseId", async (req, res) => {
  const { trainerId, courseId } = req.params;
  // res.send(`trainerId: ${trainerId}, courseId: ${courseId}`)

  // await TrainerCourse.destroy({
  //   where: {
  //     [Op.and]: [{ trainerId: trainerId }, { courseId: courseId }],
  //   }
  // })

  await TrainerCourse.destroy({
    where: {
      trainerId: trainerId,
      courseId: courseId,
    },
  });

  res.redirect("/trainingStaff");
});

// ================= Assign Trainee =================== //

module.exports = router;
