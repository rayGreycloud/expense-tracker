import { FlatList, StyleSheet, Text, View } from 'react-native';

const renderExpenseItem = (itemData) => {
  return (
    <View>
      <Text>{itemData.item.description}</Text>
    </View>
  );
};

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
