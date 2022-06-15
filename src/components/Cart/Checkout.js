import React from "react";
import useCheckOutInput from "../../Hooks/use-checkout-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: isValidName,
    hasError: nameHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputIsBlur: nameInputIsBlur,
    reset: resetNameInput,
  } = useCheckOutInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: isValidStreet,
    hasError: streetHasError,
    inputChangeHandler: streetInputChangeHandler,
    inputIsBlur: streetInputIsBlur,
    reset: resetStreetInput,
  } = useCheckOutInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: isValidPostal,
    hasError: postalHasError,
    inputChangeHandler: postalInputChangeHandler,
    inputIsBlur: postalInputIsBlur,
    reset: resetPostalInput,
  } = useCheckOutInput((value) => value.trim().length === 6);

  const {
    value: enteredCity,
    isValid: isValidCity,
    hasError: cityHasError,
    inputChangeHandler: cityInputChangeHandler,
    inputIsBlur: cityInputIsBlur,
    reset: resetCityInput,
  } = useCheckOutInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (isValidName && isValidStreet && isValidPostal && isValidCity) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!isValidName && !isValidStreet && !isValidPostal && !isValidCity) {
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostal,
    });

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  const validInputClasses = classes.control;
  const inValidInputClasses = `${classes.control} ${classes.invalid}`;

  const nameInputClasses = nameHasError
    ? inValidInputClasses
    : validInputClasses;

  const streetInputClasses = streetHasError
    ? inValidInputClasses
    : validInputClasses;

  const postalInputClasses = postalHasError
    ? inValidInputClasses
    : validInputClasses;

  const cityInputClasses = cityHasError
    ? inValidInputClasses
    : validInputClasses;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputIsBlur}
        />
        {nameHasError && <p>Enter a valid name</p>}
      </div>

      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputIsBlur}
        />
        {streetHasError && <p>Enter a valid street</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postalcode">Postal Code</label>
        <input
          type="text"
          id="postalcode"
          value={enteredPostal}
          onChange={postalInputChangeHandler}
          onBlur={postalInputIsBlur}
        />

        {postalHasError && <p>Enter a valid postal code (5 characters long)</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputIsBlur}
        />
        {cityHasError && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
