import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const expensesCtx = useContext(ExpensesContext);
  const targetExpenseId = route.params?.expenseId;

  const isEditing = !!targetExpenseId;

  const targetExpense = isEditing
    ? expensesCtx.getExpense(targetExpenseId)
    : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const onDeleteHandler = async () => {
    setIsLoading(true);

    await deleteExpense(targetExpenseId);
    expensesCtx.deleteExpense(targetExpenseId);

    setIsLoading(false);
    navigation.goBack();
  };
  const onCancelHandler = () => {
    navigation.goBack();
  };

  const onSaveHandler = async (expenseData) => {
    setIsLoading(true);

    if (isEditing) {
      await updateExpense(targetExpenseId, expenseData);
      expensesCtx.updateExpense(targetExpenseId, expenseData);

      setIsLoading(false);
    } else {
      const expenseId = await storeExpense(expenseData);
      expensesCtx.addExpense({
        id: expenseId,
        ...expenseData
      });

      setIsLoading(false);
    }

    navigation.goBack();
  };

  if (isLoading) return <LoadingOverlay />;

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
