import React from "react";
import mealsImg from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Meals2Go</h1>
        <HeaderCartButton onCartClick={props.onCartClick}>
          Cart
        </HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="A table full of food"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
