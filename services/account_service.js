const database = require("../database/models/index");
const Role = database.db.Role;
const TrainingStaff = database.db.TrainingStaff;
const Trainer = database.db.Trainer;
const Trainee = database.db.Trainee;
const Account = database.db.Account;

const getAccountById = async (accountId) => {
  const account = await Account.findOne({
    where: {
      id: accountId,
    },
    include: Role,
  });

  return account;
};

const deleteUserByRole = async (roleName, userId) => {
  let result;

  switch (roleName) {
    case "trainingStaff": {
      result = await TrainingStaff.destroy({
        where: {
          id: userId,
        },
      });
      return result;
    }
    case "trainer": {
      result = await Trainer.destroy({
        where: {
          id: userId,
        },
      });
      return result;
    }
    case "trainee": {
      result = await Trainee.destroy({
        where: {
          id: userId,
        },
      });
      return result;
    }
    default: {
      res.send("Not found any user");
    }
  }
};

const removeAccount = async (id) => {
  await Account.destroy({
    where: {
      id,
    },
  });
  return;
};

const getUserByRole = async (roleName, userId) => {
  let user;

  switch (roleName) {
    case "trainingStaff": {
      user = await TrainingStaff.findOne({
        where: {
          id: userId,
        },
      });
      return user;
    }
    case "trainer": {
      user = await Trainer.findOne({
        where: {
          id: userId,
        },
      });

      return user;
    }
    case "trainee": {
      user = await Trainee.findOne({
        where: {
          id: userId,
        },
      });

      return user;
    }
    default: {
      res.send("Not found any user");
    }
  }
};

module.exports = {
  getAccountById,
  deleteUserByRole,
  removeAccount,
  getUserByRole
};
