import { useReducer, useRef } from 'react';
import Spinner from '../UI/Spinner';
import classes from './Checkout.module.css';

function inputReducer(state, action) {
  if (action.type === 'SUBMIT') {
    return {
      name: action.name,
      street: action.street,
      postalCode: action.postalCode,
      city: action.city,
    };
  }
}

// now we need input and form validations, and then the data will be sent to firebase database!
export default function Checkout(props) {
  const nameInputRef = useRef(),
    streetInputRef = useRef(),
    postalCodeInputRef = useRef(),
    cityInputRef = useRef();

  const [formValidity, dispatchAction] = useReducer(inputReducer, {
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  function submitFormHandler(e) {
    e.preventDefault();
    const enteredName = nameInputRef.current.value,
      enteredStreet = streetInputRef.current.value,
      enteredPostalCode = postalCodeInputRef.current.value,
      enteredCity = cityInputRef.current.value;

    const nameIsValid = enteredName.trim() !== '',
      streetIsValid = enteredStreet.trim() !== '',
      postalCodeIsValid = enteredPostalCode.trim().length === 5,
      cityIsValid = enteredCity.trim() !== '';

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    dispatchAction({
      type: 'SUBMIT',
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }
    props
      .onSubmit({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
      })
      .catch(error => {
        props.setError(error.message);
      });
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div>
        <div
          className={`${classes.control} ${
            !formValidity.name && classes.invalid
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValidity.name && <p>Please enter a valid name.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.street && classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValidity.street && <p>Please enter a valid street.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.postalCode && classes.invalid
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
          {!formValidity.postalCode && <p>Please enter a valid Postal Code.</p>}
        </div>
        <div
          className={`${classes.control} ${
            !formValidity.city && classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValidity.city && <p>Please enter a valid city.</p>}
        </div>
      </div>
      <div className="overlay">{props.isLoading && <Spinner />}</div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseModal}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
