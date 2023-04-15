import { StyleSheet, Text, View } from 'react-native';

const ExpensesSummary = ({ expenses, periodName }) => {
  console.log('ExpensesSummary.jsx: expenses: ', expenses);
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text>{periodName}</Text>
      <Text>${totalExpenses.toFixed(2)}</Text>
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

export default ExpensesSummary;
