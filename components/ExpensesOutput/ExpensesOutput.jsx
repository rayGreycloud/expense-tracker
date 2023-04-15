import { StyleSheet, View } from 'react-native';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

import { DUMMY_EXPENSES } from '../../constants/dummy-expenses-data';

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
