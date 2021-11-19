import { useContext, useEffect, useState } from "react";
import PetsOrderContext from "../../../context/petsOrderContext";
import "./styles.css";
import { OrderItem } from "../../OrderItem";
import { Button } from "../../Button";

export const ShoppingCartPage = () => {

  const [order, setOrder] = useState([]);

  const globalState = useContext(PetsOrderContext);

  useEffect(
    () => {
      setOrder(globalState.order);
    }, [globalState]
  )

  return (
    <div className="pets-page">
      <h1 className="pets-title"> My Shopping Cart </h1>
      <div className="order">
        {
          order.map((item) => <OrderItem image={item.image} id={item.id} name={item.name} age={item.age} />)
        }
      </div>
      <Button text="Checkout" type="primary"></Button>
    </div>
  );
};
