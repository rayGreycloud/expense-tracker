import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../UI/Button';
import Input from './Input';

import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  initialValues,
  onCancel,
  onSubmit,
  submitButtonLabel
}) => {
  console.log('initialValues: ', initialValues);
  const [inputs, setInputs] = useState({
    amount: {
      value: initialValues ? initialValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: initialValues ? getFormattedDate(initialValues.date) : '',
      isValid: true
    },
    description: {
      value: initialValues ? initialValues.description : '',
      isValid: true
    }
  });
  console.log('inputs: ', inputs);

  const inputChangeHandler = (inputId, newValue) => {
    console.log('inputChangeHandler: ', inputId, newValue);
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputId]: {
          value: newValue,
          isValid: true
        }
      };
    });
  };

  const onSubmitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value, // convert to number
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid
          }
        };
      });

      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Details</Text>

      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          textInputConfig={{
            value: inputs.amount.value,
            onChangeText: (val) => inputChangeHandler('amount', val),
            keyboardType: 'decimal-pad'
          }}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
        />

        <Input
          label='Date'
          textInputConfig={{
            value: inputs.date.value,
            onChangeText: (val) => inputChangeHandler('date', val),
            maxLength: 10,
            placeholder: 'YYYY-MM-DD'
          }}
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
        />
      </View>

      <Input
        label='Description'
        textInputConfig={{
          value: inputs.description.value,
          onChangeText: (val) => inputChangeHandler('description', val),
          keyboardType: 'default',
          multiline: true,
          autoCorrect: true, // default
          autoCapitalize: 'sentences' // default
        }}
        invalid={!inputs.description.isValid}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={onSubmitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 16
  },
  title: {
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  rowInput: {
    flex: 1
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8
  }
});

export default ExpenseForm;
