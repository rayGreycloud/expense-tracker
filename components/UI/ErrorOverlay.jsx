import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>⚠ An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    color: GlobalStyles.colors.error500,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  message: {
    fontSize: 14
  }
});
