const createExpenseService = (usersService) => {
  const expenses = [];
  let indexCounter = 1;

  const getFilteredExpenses = (filters) => {
    const { userId, categories, from, to } = filters;
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.userId === Number(userId),
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((exp) => {
        return categories.includes(exp.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) <= new Date(to),
      );
    }

    return filteredExpenses;
  };

  const getExpenseById = (id) => {
    const expense = expenses.find((e) => e.id === Number(id));

    return expense || null;
  };

  const addExpense = (expense) => {
    const { userId, spentAt, title, amount, category, note } = expense;
    const user = usersService.getUserById(Number(userId));

    if (!user) {
      return null;
    }

    const newExpense = {
      id: indexCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  };

  const updateExpense = (id, updates) => {
    const expense = getExpenseById(id);

    if (!expense) {
      return null;
    }

    Object.assign(expense, updates);

    return expense;
  };

  const rewriteExpense = (id, newExpense) => {
    const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

    if (expenseIndex === -1) {
      return null;
    }

    const { userId, spentAt, title, amount, category, note } = newExpense;

    const changedExpense = {
      id: Number(id),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses[expenseIndex] = changedExpense;

    return changedExpense;
  };

  const deleteExpense = (id) => {
    const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

    if (expenseIndex === -1) {
      return null;
    }

    expenses.splice(expenseIndex, 1);

    return true;
  };

  return {
    getFilteredExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    rewriteExpense,
    deleteExpense,
  };
};

module.exports = {
  createExpenseService,
};
