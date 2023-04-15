import { StyleSheet, Text, View } from 'react-native';

const RecentExpenses = () => {
  return (
    <View style={styles.container}>
      <Text>Recent Expenses</Text>
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
