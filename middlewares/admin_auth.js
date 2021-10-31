const verifyAdmin = (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/auth')
  }

  const user = req.session.user;
  console.log("🚀 ~ file: admin_auth.js ~ line 7 ~ verifyAdmin ~ user", user)

  if(user.Role.name != 'admin') {
    res.redirect('/auth')
  }

  next()
}

module.exports = {
  verifyAdmin
};
