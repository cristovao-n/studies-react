// import styles from './App.module.css';
import InputArea from './components/InputArea';
import UsersList from './components/UsersList';
import Modal from './components/UI/Modal';
import { useState } from 'react';

function App() {

  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState();
  

  function addUserHandler(user) {
    setUsersList((lastState) => {
      console.log(lastState);

      return [...lastState, user];
    });
  }

  function deleteUserHandler(id) {
    setUsersList((lastState) => {
      const updatedState = lastState.filter((user) => user.id !== id);
      return updatedState;
    });
  }

  function emptyValuesErrorHandler() {
    setError({
      title: 'Invalid input',
      message: 'Please enter a valid name and age (non-empty values).'
  });
  }

  function invalidAgeErrorHandler() {
    setError({
      title: 'Invalid age',
      message: 'Please enter a valid age (> 0).'
    });
  }

  return (
    <div>
      <InputArea onAddUser={addUserHandler} showInvalidAgeError={invalidAgeErrorHandler} showEmptyValuesError={emptyValuesErrorHandler} />
      <UsersList onDeleteUser={deleteUserHandler} usersList={usersList} />
      {error && <Modal closeModal={() => setError(undefined)} title={error.title} message={error.message} />}
    </div>
  );
}

export default App;
