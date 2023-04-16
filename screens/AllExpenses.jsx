import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  console.log('all/expenses: ', expensesCtx.expenses);

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
