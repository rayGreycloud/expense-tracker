import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../utils/http';

const AllExpenses = () => {
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

  const onConfirmHandler = () => setError(null);

  if (isLoading) return <LoadingOverlay />;
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={onConfirmHandler} />;

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensesPeriod='Total'
        expenses={expensesCtx.expenses}
        fallbackText='No expenses found'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AllExpenses;
