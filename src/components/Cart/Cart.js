import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// import MealItemForm from "../Meal/MealItem/MealItemForm";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDidSubmitting, setIsDidSubmitting] = useState(false);

  const checkOutHandler = () => {
    setIsCheckout(true);
  };

  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItem = cartCtx.items.length > 0;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const submitOrderHandler = async (ordersData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-982b9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: ordersData,
          orderesItem: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsDidSubmitting(true);
    cartCtx.clearCart();
  };

  const cartItem = (
    <ul className={classes["cart-item"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          id={item.id}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout
          onCancel={props.onCloseCart}
          onSubmitOrder={submitOrderHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const orderSubmitSuccessfully = (
    <React.Fragment>
      <p>Successfully submitted order</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !isDidSubmitting && cartModalContent}
      {isSubmitting && !isDidSubmitting && <p>Submitting order...</p>}
      {!isSubmitting && isDidSubmitting && orderSubmitSuccessfully}
    </Modal>
  );
};
export default Cart;
