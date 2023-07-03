import { useReducer } from 'react';
import Card from '../UI/Card';


function reducer(state, action) {

   switch (action.type) {
      case 'DEC':
         return state + 1;
      case 'INC':
         return state - 1;
      default:
         return state; 
   }

}

function UseReducer(props) {


   const [count, dispatch] = useReducer(reducer, 0);

   return(
      <Card>
         <h1>{count}</h1>
         <button onClick={() => {dispatch({type: 'DEC'})}} >Dec</button>
         <button onClick={() => {dispatch({type: 'INC'})}} >Inc</button>
      </Card>
   );
}

export default UseReducer;