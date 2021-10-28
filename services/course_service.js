const database = require("../database/models/index");
const Course = database.db.Course;

async function removeCourse(id) {
  await Course.destroy({
    where: {
      id,
    },
  });
  return;
}
module.exports = {
  removeCourse,
};
