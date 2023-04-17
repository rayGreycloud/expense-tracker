import axios from 'axios';

import { DATEBASE_URL } from '../constants/databaseUrl';

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    `${DATEBASE_URL}/expenses.json`,
    expenseData
  );

  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${DATEBASE_URL}/expenses.json`);
  console.log('response.data: ', response.data);
  if (!response.data) {
    throw new Error('No data found');
  }
  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    });
  }

  return expenses;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(
    `${DATEBASE_URL}/expenses/${id}.json`,
    expenseData
  );

  return response;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${DATEBASE_URL}/expenses/${id}.json`);
  console.log('response: ', response);

  return response;
};
