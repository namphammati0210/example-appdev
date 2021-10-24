var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const Role = database.db.Role;
const Trainee = database.db.Trainee;
const Account = database.db.Account;
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
        name: 'trainee'
      }
    }
  });
  const courseCategories = await CourseCategory.findAll();
  const courses = await Course.findAll({
    include: CourseCategory
  });
  const trainerCourses = await TrainerCourse.findAll({
    include: [Trainer, Course]
  })

  res.render('template/master', {
    content: '../trainingStaff_view/index',
    heading: 'Training Staff Dashboard',
    traineeAccounts,
    courseCategories,
    courses,
    trainerCourses
  })
});

/* GET create trainee page. */
router.get("/createTrainee", async function (req, res) {
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
/* GET create course category page. */
router.get("/createCourseCategory", async function (req, res) {
  res.render('template/master', {
    content: '../courseCategory_view/create',
    heading: 'Create Course Category',
  })
});

router.post("/addCourseCategory", async function (req, res) {
  const { name, description} = req.body;
  const courseCategory = await CourseCategory.create({
    name,
    description,
  });

    res.redirect("/trainingStaff");

});
/* GET create course page. */
router.get("/createCourse", async function (req, res) {
  const courseCategories = await CourseCategory.findAll();
  res.render('template/master', {
    content: '../course_view/create',
    heading: 'Create Course',
    courseCategories,
  })
});

router.post("/addCourse", async function (req, res) {
  const { name, description, courseCategoryId} = req.body;
  const course = await Course.create({
    name,
    description,
    courseCategoryId,
  });

    res.redirect("/trainingStaff");

});


// ================= Assign Trainer ===================
router.get("/assignTrainer", async (req, res) => {
  const trainers = await Trainer.findAll();
  const courses = await Course.findAll();

  res.render('template/master', {
    content: '../trainer_view/assign',
    heading: 'Assign trainer',
    trainers,
    courses,
  })

})

router.post("/assignTrainer", async (req, res) => {
  try {
    const {trainerId, courseId} = req.body;
    // res.send(`${trainerId}, ${courseId}`);
    const result = await TrainerCourse.create({
      trainerId,
      courseId
    })

    res.redirect('/trainingStaff')

  } catch (error) {
    console.log("🚀 ~ file: trainingStaff.js ~ line 133 ~ router.post ~ error", error)
  }
})
module.exports = router;

