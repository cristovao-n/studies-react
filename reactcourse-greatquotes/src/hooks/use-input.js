import { useReducer } from 'react';

function inputStateReducer(state, action) {
  if (action.type === 'INPUT_CHANGE') {
    return {
      value: action.value,
      isTouched: false,
    };
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
    };
  }
}

export default function useInput(validateInput) {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: '',
    isTouched: false,
  });

  const valueIsValid = validateInput(inputState.value);
  const hasError = inputState.isTouched && !valueIsValid;

  function valueChangeHandler(e) {
    // console.log(e.nativeEvent.inputType === 'deleteContentBackward');
    dispatch({
      type: 'INPUT_CHANGE',
      value: e.target.value,
    });
  }

  function userTouchedHandler() {
    dispatch({ type: 'BLUR' });
  }

  function reset() {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    userTouchedHandler,
    reset,
  };
}
