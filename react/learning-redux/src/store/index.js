import counterReducer from './counter-slice';
import authReducer from './auth-slice';
import { configureStore } from '@reduxjs/toolkit';
// Redux doesn't merge your new state with the old state, instead it'll replace everything, so
// it's important to overwrite with the old state the data that you won't change
// we will use redux toolkit to solve and improve some aspects of the Redux
// Now we can update the old state, and the code will still be immutable
// The code will become shorter and easier
// Now we can create slices to agroup our state

// if we have multiple slices, we need to use configureStore from react toolkit because the state must be only one, and
// this method will combine all slices into one big state so we will be able to use the Redux
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;

/*

function itShouldBeAComponent() {
  const currentState = store.getState();
  console.log(currentState);
}

Now it must be done differently, we have to make the connection between React and Redux
store.subscribe(itShouldBeAComponent);

store.dispatch({
  type: 'increment',
});

*/

/*
function counterReducer(state = firstState, action) {
  switch (action.type) {
    case 'increment':
      return {
        counter: state.counter + 1,
        showCounter: state.showCounter,
      };
    case 'decrement':
      return {
        counter: state.counter - 1,
        showCounter: state.showCounter,
      };
    case 'increase':
      return {
        counter: state.counter + action.amount,
        showCounter: state.showCounter,
      };
    case 'toggle':
      return {
        counter: state.counter,
        showCounter: !state.showCounter,
      };
    default:
      return state;
  }
}
*/
