import { StyleSheet, Text, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const RecentExpenses = () => {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod='Last 7 Days' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecentExpenses;
