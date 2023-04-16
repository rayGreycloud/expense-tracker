import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';

import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const targetExpenseId = route.params?.expenseId;
  console.log('targetExpenseId: ', targetExpenseId);
  const isEditing = !!targetExpenseId;
  console.log('isEditing: ', isEditing);
  const data = isEditing ? expensesCtx.getExpense(targetExpenseId) : null;
  console.log('data: ', data);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const onDeleteHandler = () => {
    console.log('delete');
    expensesCtx.deleteExpense(targetExpenseId);
    navigation.goBack();
  };
  const onCancelHandler = () => {
    console.log('cancel');
    navigation.goBack();
  };

  const newExpense = {
    description: 'Samsung TV',
    amount: 699.99,
    date: new Date(2023, 1, 4)
  };

  const onSaveHandler = () => {
    console.log('save');
    if (isEditing) {
      const data = { ...data, description: 'New Description' };
      expensesCtx.updateExpense(targetExpenseId, data);
    } else {
      expensesCtx.addExpense(newExpense);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={onCancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={onSaveHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}{' '}
        </Button>
      </View>
      {isEditing && (
        <>
          <View>
            <Text style={styles.text}>{JSON.stringify(data, null, 2)}</Text>
          </View>
          <View style={styles.deleteContainer}>
            <IconButton
              icon='trash'
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={onDeleteHandler}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  text: {
    color: 'white',
    fontSize: 12
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});

export default ManageExpense;
