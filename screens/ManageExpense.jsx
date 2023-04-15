import { StyleSheet, Text, View } from 'react-native';

const ManageExpense = () => {
  return (
    <View style={styles.container}>
      <Text>Manage Expense</Text>
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

export default ManageExpense;
