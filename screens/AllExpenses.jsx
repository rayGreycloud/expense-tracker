import { StyleSheet, Text, View } from 'react-native';

const AllExpenses = () => {
  return (
    <View style={styles.container}>
      <Text>All Expenses</Text>
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

export default AllExpenses;
