import { useState } from 'react';
import { Prompt } from 'react-router';
import useInput from '../../hooks/use-input';
import Card from '../UI/Card';
import InputError from '../UI/InputError';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

function capitalizeAuthorNames(enteredAuthor) {
  const authorNamesCapitalized = enteredAuthor.split(' ').map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  });

  const concatenatedName = authorNamesCapitalized.join(' ');

  return concatenatedName;
}

const QuoteForm = props => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    value: enteredAuthor,
    isValid: enteredAuthorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    userTouchedHandler: authorBlurHandler,
  } = useInput(enteredAuthor => enteredAuthor.trim() !== '');

  const {
    value: enteredText,
    isValid: enteredTextIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    userTouchedHandler: textBlurHandler,
  } = useInput(enteredText => enteredText.trim() !== '');

  const formIsValid = enteredAuthorIsValid && enteredTextIsValid;

  function submitFormHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      authorBlurHandler();
      textBlurHandler();
      alert('You must enter all data');
      return;
    }

    const concatenatedNameCapitalized = capitalizeAuthorNames(enteredAuthor);

    props.onAddQuote({
      author: concatenatedNameCapitalized,
      text: enteredText,
    });
  }

  const notShowMessage =
    (enteredAuthor.length === 0 && enteredText.length === 0) ||
    hasSubmitted === true;
  return (
    <>
      <Prompt
        when={!notShowMessage}
        message={location => {
          return `Are you sure you wanna go to ${location.pathname} and lost all your entered data?`;
        }}
      />
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Autor</label>
            <input
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
              type="text"
              id="author"
            />
            {authorHasError && (
              <InputError message="Autor deve ser preenchido." />
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Citação</label>
            <textarea
              onChange={textChangeHandler}
              onBlur={textBlurHandler}
              id="text"
              rows="5"
            ></textarea>
            {textHasError && (
              <InputError message="Citação deve ser preenchida." />
            )}
          </div>
          <div className={classes.actions}>
            <button onClick={() => setHasSubmitted(true)} className="btn">
              Adicionar Citação
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
