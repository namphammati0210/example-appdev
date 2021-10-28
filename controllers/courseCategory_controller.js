const { removeCourseCategory } = require("../services/courseCategory_service");

async function deleteCourseCategory(req, res, next) {
  try {
    const { id } = req.query;
    await removeCourseCategory(id);
    next();
  } catch (error) {
    console.log();
    next();
  }
}

module.exports = {
  deleteCourseCategory,
};
