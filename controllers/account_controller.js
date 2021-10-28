const {
  getAccountById,
  deleteUserByRole,
  removeAccount,
} = require("../services/account_service");

const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.query;
    const account = await getAccountById(id);
    const result = await deleteUserByRole(account.Role.name, account.userId);
    await removeAccount(id);

    if (result) {
      next();
    }
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 90 ~ router.get ~ error", error);
    next();
  }
};

module.exports = {
  deleteAccount,
};
