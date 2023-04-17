import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import { ExpensesContext } from '../store/expenses-context';
import { isLast7Days } from '../utils/date';
import { fetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        setIsLoading(true);
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Error fetching expenses!');
      } finally {
        setIsLoading(false);
      }
    }

    getExpenses();
  }, []);

  const expenses = expensesCtx.expenses.filter((expense) =>
    isLast7Days(expense.date)
  );

  const onConfirmHandler = () => setError(null);

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={onConfirmHandler} />;

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
