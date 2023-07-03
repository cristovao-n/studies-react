import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { counterActions } from '../store/counter-slice';
const Counter = () => {
  const dispatch = useDispatch();

  // when we use this hook, react-redux will automaticaly create a subscription to the redux store for this component
  // so we'll always have the latest snapshot of the state
  // if the component is removed from the DOM, the subscription will be removed too
  // this hook will return only the data you really need for this component, that's why we have to pass a function.
  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);
  const [step, setStep] = useState('');

  function incHandler() {
    dispatch(counterActions.increment());
  }

  function decHandler() {
    dispatch(counterActions.decrement());
  }

  function increaseHandler() {
    dispatch(counterActions.increase(Number(step))); // {type: SOME_UNIQUE_IDENTIFIER, payload: Number(step)}
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decHandler}>Decrement</button>
        <button onClick={incHandler}>Increment</button>
        <div>
          <button onClick={increaseHandler}>Increase by {step} </button>
          <input
            type="number"
            step="1"
            value={step}
            onChange={e => {
              setStep(e.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// CONSUMING REDUX WITH CLASS-BASED COMPONENTS
/*
class Counter extends Component {
  incHandler() {
    this.props.inc();
  }

  decHandler() {
    this.props.dec();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.decHandler.bind(this)}>Decrement</button>
          <button onClick={this.incHandler.bind(this)}>Increment</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inc: () => dispatch({ type: 'increment' }),
    dec: () => dispatch({ type: 'decrement' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);


 */

/* OLD WAY OF DISPATCHING ACTIONS, WITHOUT TOOLKIT
  function incHandler() {
    dispatch({ type: 'increment' });
  }

  function increaseHandler() {
    dispatch({ type: 'increase', amount: Number(step) });
  }

  function decHandler() {
    dispatch({ type: 'decrement' });
  }

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };
*/
