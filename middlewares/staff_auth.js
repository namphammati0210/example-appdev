const verifyStaff = (req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/auth')
  }

  const user = req.session.user;
  console.log("🚀 ~ file: staff_auth.js ~ line 7 ~ verifyStaff ~ user", user)

  if(user.Role.name != 'trainingStaff') {
    return res.redirect('/auth')
  }

  next()
}

module.exports = {
  verifyStaff
};
