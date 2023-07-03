import { useContext, useState, Fragment } from 'react';

import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [hasError, setHasError] = useState();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async userData => {
    setIsLoading(true);
    const response = await fetch(
      'https://food-order-a04c2-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsLoading(false);
    if (!response.ok) {
      throw new Error(`Error ${response.status} ${response.statusText}`);
    }
    cartCtx.clearCart();
    setWasSubmitted(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          onClick={() => setShowCheckout(true)}
          className={classes.button}
        >
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout ? (
        <>
          <Checkout
            setError={setHasError}
            onSubmit={submitOrderHandler}
            onCloseModal={props.onClose}
            isLoading={isLoading}
          />
        </>
      ) : (
        modalButtons
      )}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!wasSubmitted && !hasError && modalContent}
      {wasSubmitted && !hasError && (
        <>
          <h2>Sucessfully sent the order!</h2>
          <div className={classes.actions}>
            <button onClick={props.onClose} className={classes.button}>
              Close
            </button>
          </div>
        </>
      )}
      {!wasSubmitted && hasError && (
        <Fragment>
          <h2>Sorry, an error ocurred, try again later!</h2>
          <p>{hasError}</p>
          <div className={classes.actions}>
            <button onClick={props.onClose} className={classes.button}>
              Close
            </button>
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default Cart;
