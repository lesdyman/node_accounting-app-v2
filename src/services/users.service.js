const createUserService = () => {
  const users = [];
  let idIndex = 1;

  const getAllUsers = () => users;

  const getUserById = (id) => users.find((u) => u.id === id);

  const addUser = (name) => {
    const newUser = {
      id: idIndex++,
      name,
    };

    users.push(newUser);

    return newUser;
  };

  const updateUser = (id, name) => {
    const user = getUserById(id);

    if (!user) {
      return null;
    }

    const changedUser = { ...user, name };

    Object.assign(user, changedUser);

    return changedUser;
  };

  const deleteUser = (id) => {
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);

    return true;
  };

  const rewriteUser = (id, name) => {
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    const changedUser = { id, name };

    users[userIndex] = changedUser;

    return changedUser;
  };

  return {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    rewriteUser,
  };
};

module.exports = {
  createUserService,
};
