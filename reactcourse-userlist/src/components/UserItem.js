import styles from './UserItem.module.css';

function UserItem(props) {

   function deleteUserHandler() {
      props.onDeleteUser(props.id);
   }

   return (
      <li className={styles['list-item']}>
         <p>{props.name} ({props.age} years old)</p>
         <button onClick={deleteUserHandler} className={styles.delete}>X</button>
      </li>
   );
}

export default UserItem;