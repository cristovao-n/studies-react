import { useState } from 'react';
import styles from './InputArea.module.css';
import Card from './UI/Card';
import Button from './UI/Button';

function InputArea(props) {

   const [name, setName] = useState('');
   const [age, setAge] = useState('');

   function submitUserHandler(e) {

      e.preventDefault();

      if (name.trim() === '' || age.trim() === '') {
         props.showEmptyValuesError();
      } else if (Number(age) < 0) {
         props.showInvalidAgeError();
      } else {
         const id = Math.round(Math.random() * 1000);
         const user = { name, age, id }
         props.onAddUser(user);

      }
      
      setName('');
      setAge('');
   }

   return (
      <Card>
         <form onSubmit={submitUserHandler}>
            <div className={styles['input-group']}>
               <label htmlFor="name">Username</label>
               <input value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" type="text" />
            </div>
            <div className={styles['input-group']}>
               <label htmlFor="age">Age (Years)</label>
               <input value={age} onChange={(e) => setAge(e.target.value)} id="age" name="age" type="number" />
            </div>
            <Button type="submit">Add User</Button>
         </form>
      </Card>
   );
}

export default InputArea;