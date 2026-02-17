const createExpenseControllers = (expensesService) => {
  const get = (req, res) => {
    const { userId, categories, from, to } = req.query;

    const filteredExpenses = expensesService.getFilteredExpenses({
      userId,
      categories,
      from,
      to,
    });

    res.status(200).json(filteredExpenses);
  };

  const getById = (req, res) => {
    const { id } = req.params;

    const expense = expensesService.getExpenseById(Number(id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  };

  const add = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newExpense = expensesService.addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!newExpense) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    res.status(201).json(newExpense);
  };

  const update = (req, res) => {
    const { id } = req.params;

    const allowedFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const updatedExpense = expensesService.updateExpense(Number(id), updates);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(updatedExpense);
  };

  const rewrite = (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.status(422).json({ error: 'All fields are required' });
    }

    const changedExpense = expensesService.rewriteExpense(Number(id), {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!changedExpense) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    res.status(200).json(changedExpense);
  };

  const remove = (req, res) => {
    const { id } = req.params;

    const deleted = expensesService.deleteExpense(Number(id));

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(204).send();
  };

  return {
    get,
    getById,
    add,
    update,
    rewrite,
    remove,
  };
};

module.exports = {
  createExpenseControllers,
};
