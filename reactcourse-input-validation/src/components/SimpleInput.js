import ErrorMsg from './ErrorMsg';

import useInput from '../hooks/useInput';

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(enteredName => enteredName.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  function validateEmail(enteredEmail) {
    const emailRegex = /^[a-zA-Z0-9_\-.]+@[a-z]+\.[a-zA-Z]{2,5}$/;
    return emailRegex.test(enteredEmail);
  }

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  function submitFormHandler(e) {
    e.preventDefault();
    // If I remove the disabled button logic, these 2 lines will be required, so I have to think in a way to fix it
    // setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    if (!formIsValid) {
      // Display some error
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    resetNameInput();
    resetEmailInput();
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div className={`form-control ${nameHasError && 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
        />
        {nameHasError && <ErrorMsg>Name must not be empty.</ErrorMsg>}
      </div>

      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
        />
        {emailHasError && <ErrorMsg>Email must be valid.</ErrorMsg>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
