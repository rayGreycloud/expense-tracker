import axios from 'axios';

import { DATEBASE_URL } from '../constants/databaseUrl';

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      `${DATEBASE_URL}/expenses.json`,
      expenseData
    );

    return response.data.name;
  } catch (error) {
    console.log('storeExpense error: ', error);
    return null;
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${DATEBASE_URL}/expenses.json`);

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
  } catch (error) {
    console.log('fetchExpenses error: ', error);
    return null;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await axios.put(
      `${DATEBASE_URL}/expenses/${id}.json`,
      expenseData
    );

    return response;
  } catch (error) {
    console.log('updateExpense error: ', error);
    return null;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${DATEBASE_URL}/expenses/${id}.json`);

    return response;
  } catch (error) {
    console.log('deleteExpense error: ', error);
    return null;
  }
};
