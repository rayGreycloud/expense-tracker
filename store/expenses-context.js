import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  getExpense: (id) => {},
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'SET':
      return action.payload.reverse();

    case 'UPDATE':
      const targetExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = {
        ...state[targetExpenseIndex],
        ...action.payload.data
      };
      const updatedExpenses = [...state];
      updatedExpenses[targetExpenseIndex] = updatedExpense;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

const ExpensesProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const getExpense = (id) => {
    return expenses.find((expense) => expense.id === id);
  };

  const addExpense = (data) => {
    dispatch({ type: 'ADD', payload: data });
  };

  const setExpenses = (data) => {
    dispatch({ type: 'SET', payload: data });
  };

  const updateExpense = (id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const value = {
    expenses,
    getExpense,
    addExpense,
    setExpenses,
    updateExpense,
    deleteExpense
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
