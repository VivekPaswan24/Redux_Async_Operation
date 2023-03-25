import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
  const products = useSelector((state) => state.products);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {products.map((item) => (
          <CartItem
            key={item.id}
            item={{
              title: item.title,
              quantity: item.quantity,
              total: item.total,
              price: item.price,
              id:item.id
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
