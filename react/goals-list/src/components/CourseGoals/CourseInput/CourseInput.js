import React, { useState } from 'react';
// import styled from 'styled-components';
import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';
// const FormControl = styled.div`

//   margin: 0.5rem 0;


// & label {
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
//   color: ${props => props.invalid ? 'red' : 'black'}
// }

// & input {
//   display: block;
//   width: 100%;
//   font: inherit;
//   line-height: 1.5rem;
//   padding: 0 0.25rem;
//   border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
//   background-color: ${props => props.invalid ? '#ffe9e9' : 'transparent'};
// }

// & input:focus {
//   outline: none;
//   background: #fad0ec;
//   border-color: #8b005d;
// }


// `;


const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    // .trim() is good to avoid white spaces
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    props.onAddGoal(enteredValue);
    setEnteredValue('');

  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
        {/* These are inline styles, that have a high priority */}
        <label >Course Goal</label>
        <input value={enteredValue} type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;


/* These are inline styles, that have a high priority
<label style={{ color }}>Course Goal</label>
<input style={{
  backgroundColor: !isValid ? 'salmon' : 'transparent',
  borderColor: !isValid ? 'red' : '#ccc'
}} value={enteredValue} type="text" onChange={goalInputChangeHandler} />
*/