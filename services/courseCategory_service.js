const database = require("../database/models/index");
const CourseCategory = database.db.CourseCategory;

async function removeCourseCategory(id) {
  await CourseCategory.destroy({
    where: {
      id,
    },
  });
  return;
}
module.exports = {
  removeCourseCategory,
};
