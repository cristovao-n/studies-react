import { useEffect, useRef } from 'react';
import classes from './NewCommentForm.module.css';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import { useParams } from 'react-router';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = props => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const params = useParams();
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = event => {
    event.preventDefault();
    const enteredComment = commentTextRef.current.value;

    // optional: Could validate here
    if (enteredComment.trim() === '') {
      alert('Você deve enviar um comentário válido!');
      return;
    }
    // send comment to server
    sendRequest({
      commentData: {
        text: enteredComment,
      },
      quoteId: params.id,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'peding' && (
        <div className="centerd">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Seu comentário</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Adicionar comentário</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
