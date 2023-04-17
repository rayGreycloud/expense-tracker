import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../utils/http';

const AllExpenses = () => {
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

  if (isLoading) return <LoadingOverlay />;

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
