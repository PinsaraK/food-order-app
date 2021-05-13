import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartButtonClicked, setCartButtonClicked] = useState(false);

  const cartClicked = () => {
    setCartButtonClicked(true);
  };

  const closeCartClicked = () => {
    setCartButtonClicked(false);
  };
  return (
    <CartProvider>
      {cartButtonClicked && <Cart onClose={closeCartClicked} />}

      <Header onCartClick={cartClicked} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
