import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

import { ExpensesContext } from '../store/expenses-context';
import { isLast7Days } from '../utils/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const expenses = expensesCtx.expenses.filter((expense) =>
    isLast7Days(expense.date)
  );

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensesPeriod='Last 7 Days'
        expenses={expenses}
        fallbackText='No expenses from last 7 days found'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RecentExpenses;
