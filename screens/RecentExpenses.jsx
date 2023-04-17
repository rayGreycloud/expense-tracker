import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { ExpensesContext } from '../store/expenses-context';
import { isLast7Days } from '../utils/date';
import { fetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  const expenses = expensesCtx.expenses.filter((expense) =>
    isLast7Days(expense.date)
  );

  if (isLoading) return <LoadingOverlay />;

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
