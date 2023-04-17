import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
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
  const targetExpense = isEditing
    ? expensesCtx.getExpense(targetExpenseId)
    : null;
  console.log('targetExpense: ', targetExpense);

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

  const onSaveHandler = (data) => {
    console.log('save');
    console.log('data: ', data);
    if (isEditing) {
      expensesCtx.updateExpense(targetExpenseId, data);
    } else {
      expensesCtx.addExpense(data);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <ExpenseForm
        onCancel={onCancelHandler}
        onSubmit={onSaveHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        initialValues={targetExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={onDeleteHandler}
          />
        </View>
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
