const {
  getAccountById,
  deleteUserByRole,
  removeAccount,
  getUserByRole
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

const getAccount = async (req, res, next) => {
  try {
    const { id } = req.query;
    const account = await getAccountById(id);

    const user = await getUserByRole(account.Role.name, account.userId);
    const accountDetail = { ...account.dataValues, User: user };
    req.account = accountDetail;
    next();  
  } catch (error) {
    console.log("🚀 ~ file: admin.js ~ line 80 ~ error", error);
    next();
  }
}

module.exports = {
  deleteAccount,
  getAccount
};
