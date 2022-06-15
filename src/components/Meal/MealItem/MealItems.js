import { Fragment, useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import classes from "./MealItems.module.css";

const MealItems = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const CartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    CartCtx.addItem({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <Fragment>
      <li className={classes.meal}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </Fragment>
  );
};
export default MealItems;
