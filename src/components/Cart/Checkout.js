import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isFiveChars = (value) => {
  return value.length === 5;
};
const Checkout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInput.current.value;
    const street = streetInput.current.value;
    const postal = postalInput.current.value;
    const city = cityInput.current.value;

    const nameValid = !isEmpty(name);
    const streetValid = !isEmpty(street);
    const cityValid = !isEmpty(city);
    const postalValid = isFiveChars(postal);

    setFormInputsValid({
      name: nameValid,
      street: streetValid,
      city: cityValid,
      postal: postalValid,
    });

    const formValid = nameValid && streetValid && cityValid && postalValid;

    if (!formValid) {
      return;
    }

    props.onConfirm({
      name: name,
      street: street,
      postal: postal,
      city: city,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formInputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formInputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal" />
        {!formInputsValid.postal && (
          <p>Please enter a valid postal code! (5 characters long)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formInputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
