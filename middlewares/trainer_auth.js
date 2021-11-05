const verifyTrainer = (req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/auth')
  }

  const user = req.session.user;
  console.log("🚀 ~ file: admin_auth.js ~ line 7 ~ verifyAdmin ~ user", user)

  if(user.Role.name != 'trainer') {
    return res.redirect('/auth')
  }

  next()
}

module.exports = {
  verifyTrainer
};
