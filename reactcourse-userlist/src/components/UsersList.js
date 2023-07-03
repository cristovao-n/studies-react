import styles from './UsersList.module.css';
import UserItem from './UserItem';
import Card from './UI/Card';

function UsersList(props) {

   function deleteUserHandler(id) {
      props.onDeleteUser(id);
   }

   let content;

   if (props.usersList.length === 0) {
      content = <p>Nothing here. You should add a new user</p>;
   } else {
      content = (
         <ul className={styles['users-list']}>
            {props.usersList.map(user => (
               <UserItem
                  onDeleteUser={deleteUserHandler}
                  id={user.id}
                  key={user.id}
                  name={user.name}
                  age={user.age}
               />))}
         </ul>
      );
   }
   return (
      <Card>
         {content}
      </Card>
   );
}

export default UsersList;