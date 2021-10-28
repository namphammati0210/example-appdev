const { removeCourse } = require("../services/course_service");

async function deleteCourse(req, res, next) {
  try {
    const { id } = req.query;
    await removeCourse(id);
    next();
  } catch (error) {
    console.log();
    next();
  }
}

module.exports = {
  deleteCourse,
};
