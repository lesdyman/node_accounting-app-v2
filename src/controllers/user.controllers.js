const createUserControllers = (usersService) => {
  const get = (req, res) => {
    const users = usersService.getAllUsers();

    res.status(200).json(users);
  };

  const getById = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(422).json({ error: 'Invalid user ID' });
    }

    if (!id) {
      return res.status(422).json({ error: 'User ID is required' });
    }

    const user = usersService.getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200);
    res.json(user);
  };

  const create = (req, res) => {
    const newUserName = req.body.name;

    if (!newUserName) {
      return res.status(400).json({ error: 'User name is required' });
    }

    const newUser = usersService.addUser(newUserName);

    res.status(201).json(newUser);
  };

  const update = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(422).json({ error: 'Invalid user ID' });
    }

    if (!id) {
      return res.status(422).json({ error: 'User ID is required' });
    }

    if (!name) {
      return res.status(422).json({ error: 'User name is required' });
    }

    const changedUser = usersService.updateUser(Number(id), name);

    if (!changedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(changedUser);
  };

  const rewrite = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(422).json({ error: 'Invalid user ID' });
    }

    if (!id) {
      return res.status(422).json({ error: 'User ID is required' });
    }

    if (!name) {
      return res.status(422).json({ error: 'User name is required' });
    }

    const changedUser = usersService.rewriteUser(Number(id), name);

    if (!changedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(changedUser);
  };

  const deleteUser = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(422).json({ error: 'Invalid user ID' });
    }

    if (!id) {
      return res.status(422).json({ error: 'User ID is required' });
    }

    const deletedUser = usersService.deleteUser(Number(id));

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  };

  return {
    get,
    getById,
    create,
    update,
    rewrite,
    deleteUser,
  };
};

module.exports = {
  createUserControllers,
};
