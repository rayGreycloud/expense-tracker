import { FlatList, StyleSheet, Text, View } from 'react-native';

import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => <ExpenseItem {...itemData.item} />;

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ExpensesList;
